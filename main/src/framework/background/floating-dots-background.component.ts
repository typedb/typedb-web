import { isPlatformServer } from "@angular/common";
import {
    AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, NgZone, OnDestroy, PLATFORM_ID,
    ViewChild, ViewEncapsulation,
} from "@angular/core";

// --- Settings ---
const gridSpacing = 50;     // Base spacing unit for the grid (horizontal segment length)
const particleCount = 75;   // Increased particle count for a denser feel
const particleSpeed = 0.5;  // How fast particles move
const particleColor = 'rgba(0, 150, 100, 0.7)'; // A "cyber" green

// Pre-calculate trigonometry constants for movement
// These define the standard 30-degree isometric projection angles
const SIN30 = 0.5; // Math.sin(Math.PI / 6)
const COS30 = Math.cos(Math.PI / 6); // ~0.866

class Particle {
    x: number;
    y: number;
    dir: number; // 0-5 for 6 isometric directions
    speed: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        // Snap particle initial position to the isometric grid
        const isoXStep = gridSpacing * COS30 * 2; // Horizontal distance between two "vertical" grid lines
        const isoYStep = gridSpacing * SIN30 * 2; // Vertical distance between two "horizontal" grid lines

        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;

        // Snap to nearest isometric grid intersection
        let gridX = Math.round(this.x / isoXStep) * isoXStep;
        let gridY = Math.round(this.y / isoYStep) * isoYStep;

        // Apply staggering for odd/even rows
        if (Math.round(gridY / isoYStep) % 2 !== 0) {
            gridX += isoXStep / 2;
        }
        this.x = gridX;
        this.y = gridY;

        // Pick a random isometric direction
        this.dir = Math.floor(Math.random() * 6);
        this.speed = Math.random() * particleSpeed + 0.2;
    }

    update(): void {
        // Use pre-calculated values for 30-degree angle movement
        const moveX = this.speed * COS30;
        const moveY = this.speed * SIN30;

        switch (this.dir) {
            case 0: this.x += moveX; this.y -= moveY; break; // Up-right
            case 1: this.x += moveX; this.y += moveY; break; // Down-right
            case 2: this.x -= moveX; this.y += moveY; break; // Down-left
            case 3: this.x -= moveX; this.y -= moveY; break; // Up-left
            case 4: this.y -= this.speed; break; // Up (vertical)
            case 5: this.y += this.speed; break; // Down (vertical)
        }

        if (Math.random() < 0.01) { // 1% chance per frame to turn
            this.dir = Math.floor(Math.random() * 6);
        }

        // Reset particle if it goes off-screen
        if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
            Object.assign(this, new Particle(this.canvas, this.ctx));
        }
    }

    draw(): void {
        this.ctx.fillStyle = particleColor;
        this.ctx.fillRect(this.x - 1, this.y - 1, 2, 2); // Draw a 2x2 pixel particle
    }
}

@Component({
    selector: "td-floating-dots-background",
    template: `<canvas #canvas aria-hidden="true"></canvas>`,
    styles: [`
        td-floating-dots-background canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FloatingDotsBackgroundComponent implements AfterViewInit, OnDestroy {
    @ViewChild("canvas") private canvasRef!: ElementRef<HTMLCanvasElement>;

    private particles: Particle[] = [];
    private animationFrameId?: number;
    private readonly platformId = inject(PLATFORM_ID);
    private readonly zone = inject(NgZone);
    private readonly onResize = () => this.resizeCanvas();

    ngAfterViewInit(): void {
        if (isPlatformServer(this.platformId)) return;

        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        window.addEventListener("resize", this.onResize);
        this.resizeCanvas();

        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(canvas, ctx));
        }

        this.zone.runOutsideAngular(() => {
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.particles.forEach((p) => {
                    p.update();
                    p.draw();
                });
                this.animationFrameId = requestAnimationFrame(animate);
            };
            animate();
        });
    }

    ngOnDestroy(): void {
        if (isPlatformServer(this.platformId)) return;
        if (this.animationFrameId != null) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener("resize", this.onResize);
    }

    private resizeCanvas(): void {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
