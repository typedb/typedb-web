import { AsyncPipe, DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { map } from "rxjs";
import { SanityDataset, SanityUseCasePageInstance, UseCasePageInstance, useCasePageSchemaName } from "typedb-web-schema";
import { HotTopicsComponent } from "../../framework/hot-topics/hot-topics.component";
import { KeyPointPanels2x2Component } from "../../framework/key-point/key-point-panels-2x2.component";
import { PolyglotComparisonComponent } from "../../framework/polyglot-comparison/polyglot-comparison.component";
import { IllustrationSectionComponent } from "../../framework/section/illustration/illustration-section.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";
import { SimpleLinkPanelsComponent } from "src/framework/link-panels/simple/simple-link-panels.component";
import { LinkPanelsComponent } from "src/framework/link-panels/link-panels.component";
// No need for 'After' from 'v8'

// --- Settings ---
const gridSpacing = 50;     // Base spacing unit for the grid (horizontal segment length)
const particleCount = 75;   // Increased particle count for a denser feel
const particleSpeed = 0.5;  // How fast particles move
const particleColor = 'rgba(0, 150, 100, 0.7)'; // A "cyber" green
const gridColor = 'rgba(255, 255, 255, 0.05)'; // Very subtle grid

// Pre-calculate trigonometry constants for movement
// These define the standard 30-degree isometric projection angles
const SIN30 = 0.5; // Math.sin(Math.PI / 6)
const COS30 = Math.cos(Math.PI / 6); // ~0.866

// --- NEW: Particle Class (Refactored) ---
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

    // --- MODIFIED: Snap particle initial position to isometric grid ---
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
    // --- END MODIFIED ---

    // Pick a random isometric direction
    this.dir = Math.floor(Math.random() * 6);
    this.speed = Math.random() * particleSpeed + 0.2;
  }

  /**
   * Updates the particle's position and direction.
   */
  update(): void {
    // Use pre-calculated values for 30-degree angle movement
    const moveX = this.speed * COS30;
    const moveY = this.speed * SIN30;

    switch (this.dir) {
      case 0: this.x += moveX; this.y -= moveY; break; // Up-right
      case 1: this.x += moveX; this.y += moveY; break; // Down-right
      case 2: this.x -= moveX; this.y += moveY; break; // Down-left
      case 3: this.x -= moveX; this.y -= moveY; break; // Up-left
      case 4: this.y -= this.speed; break; // Up (Vertical) - this actually needs to be iso-scaled to look right
      case 5: this.y += this.speed; break; // Down (Vertical) - this actually needs to be iso-scaled to look right
    }

    // --- Correction for vertical movement ---
    // For true isometric movement, 'vertical' paths should also follow the 30-degree projection.
    // However, for a "data stream" look, a purely vertical movement might be desired.
    // If you want pure vertical to *also* scale, use:
    // case 4: this.y -= this.speed * SIN30 * 2; break; // More "true" isometric vertical
    // case 5: this.y += this.speed * SIN30 * 2; break; // More "true" isometric vertical
    // For now, keeping your original interpretation of vertical movement for effect.
    // The key is that the grid will now match the angled paths regardless.


    // Simplified Turning Logic - kept from previous version
    if (Math.random() < 0.01) { // 1% chance per frame to turn
      this.dir = Math.floor(Math.random() * 6);
    }
    
    // Reset particle if it goes off-screen
    if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
      Object.assign(this, new Particle(this.canvas, this.ctx));
    }
  }

  /**
   * Draws the particle on the canvas.
   */
  draw(): void {
    this.ctx.fillStyle = particleColor;
    this.ctx.fillRect(this.x - 1, this.y - 1, 2, 2); // Draw a 2x2 pixel particle
  }
}


@Component({
    selector: "td-use-case-page",
    templateUrl: "./use-case-page.component.html",
    styleUrls: ["./use-case-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe, PolyglotComparisonComponent, SectionCoreComponent,
        IllustrationSectionComponent, HotTopicsComponent, LinkPanelsComponent
    ]
})
export class UseCasePageComponent extends PageComponentBase<UseCasePageInstance> implements AfterViewInit {
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    particles: Particle[] = [];
    private document = inject(DOCUMENT);

    protected override getPage(db: SanityDataset) {
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const sanityUseCasePageInstances = db.getDocumentsByType<SanityUseCasePageInstance>(useCasePageSchemaName);
                const page = sanityUseCasePageInstances.find((x) => x.route.current === params.get("slug"));
                return page ? new UseCasePageInstance(page, db) : null;
            }),
        );
    }

    protected override onPageReady(page: UseCasePageInstance): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB in ${page.title}`);
    }

    ngAfterViewInit(): void {
      this.canvas = this.document.getElementById('cyber-background') as HTMLCanvasElement;
      if (!this.canvas) {
          console.error('Canvas element #cyber-background not found!');
          return;
      }
      
      const ctx = this.canvas.getContext('2d');
      if (!ctx) {
          console.error('Failed to get canvas 2D context');
          return;
      }
      this.ctx = ctx;

      window.addEventListener('resize', this.resizeCanvas.bind(this));
      this.resizeCanvas();
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
          this.particles.push(new Particle(this.canvas, this.ctx));
      }

      this.animate();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Animation loop
    animate() {
        this.zone.runOutsideAngular(() => {
        if (!this.ctx || !this.canvas) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // --- MODIFIED: Draw the Isometric Grid to match particle movement ---
        // Each 'diamond' (rhombus) is formed by two horizontal segments and two angled segments.
        // The effective width of one diamond is gridSpacing (horizontal) * 2 * COS30
        // The effective height of one diamond is gridSpacing (vertical) * 2 * SIN30
        
        // const segmentLength = gridSpacing; // Length of one grid line segment
        // const horizontalStep = segmentLength * COS30; // Horizontal component of a 30-deg segment
        // const verticalStep = segmentLength * SIN30;   // Vertical component of a 30-deg segment
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = gridColor;
        this.ctx.lineWidth = 1;

        // Draw lines from bottom-left to top-right
        // for (let x = -this.canvas.width; x < this.canvas.width * 2; x += 2 * horizontalStep) {
        //   this.ctx.moveTo(x, 0);
        //   this.ctx.lineTo(x + this.canvas.height / (2 * verticalStep) * (2 * horizontalStep), this.canvas.height);
        // }

        // Draw lines from top-left to bottom-right
        // for (let x = -this.canvas.width; x < this.canvas.width * 2; x += 2 * horizontalStep) {
        //   this.ctx.moveTo(x, this.canvas.height);
        //   this.ctx.lineTo(x + this.canvas.height / (2 * verticalStep) * (2 * horizontalStep), 0);
        // }

        // Draw vertical lines (these are truly vertical in screen space in a standard iso projection)
        // Adjust start/end points to cover the entire canvas, and respect the staggered grid
        // const effectiveVerticalOffset = verticalStep * 2; // Vertical distance between intersection rows
        // const effectiveHorizontalOffset = horizontalStep * 2; // Horizontal distance between vertical lines (at same y-level)

        // for (let x = -this.canvas.width; x < this.canvas.width * 2; x += effectiveHorizontalOffset) {
        //     for (let y = -this.canvas.height; y < this.canvas.height * 2; y += effectiveVerticalOffset) {
        //         // Apply a horizontal stagger for every other row of 'vertical' lines
        //         const startX = x + (Math.floor(y / effectiveVerticalOffset) % 2 === 0 ? horizontalStep : 0);
        //         this.ctx.moveTo(startX, y);
        //         this.ctx.lineTo(startX, y + effectiveVerticalOffset);
        //     }
        // }
        
        this.ctx.stroke();
        // ---------------------------------

        // Update and draw all particles
        this.particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(() => this.animate());
        });
    }
}
