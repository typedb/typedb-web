export const initCustomScrollbars = (container: HTMLElement) => {
    const updateScrollbarThumb = (scrollbar: HTMLElement, orientation: "x" | "y"): void => {
        const [clientSize, scrollSize, scrollOffset, size, offsetSide] =
            orientation === "x"
                ? (["clientWidth", "scrollWidth", "scrollLeft", "width", "left"] as const)
                : (["clientHeight", "scrollHeight", "scrollTop", "height", "top"] as const);
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;

        const thumbSize = container[clientSize] / container[scrollSize];

        if (thumbSize === 1) {
            scrollbar.style.display = "none";
            return;
        }

        scrollbar.style.display = "";

        const scrollPosition = container[scrollOffset] / (container[scrollSize] - container[clientSize]);

        const thumbOffset = scrollPosition * (scrollbar[clientSize] - scrollbarThumb[clientSize]);
        scrollbarThumb.style[size] = `${thumbSize * 100}%`;
        scrollbarThumb.style[offsetSide] = `${thumbOffset}px`;
    };

    const initScrollbarThumbListeners = (scrollbar: HTMLElement, orientation: "x" | "y"): void => {
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;

        scrollbarThumb.addEventListener("mousedown", (ev) => onScrollbarThumbMouseDown(ev, scrollbar, orientation));
        scrollbar.addEventListener("mousedown", (ev) => onScrollbarMouseDown(ev, scrollbar, orientation));
    };

    const onScrollbarThumbMouseDown = (ev: MouseEvent, scrollbar: HTMLElement, orientation: "x" | "y"): void => {
        ev.preventDefault();
        ev.stopPropagation();

        const [clientSize, scrollSize, scrollOffset, clientOffset, offset] =
            orientation === "x"
                ? (["clientWidth", "scrollWidth", "scrollLeft", "clientX", "offsetLeft"] as const)
                : (["clientHeight", "scrollHeight", "scrollTop", "clientY", "offsetTop"] as const);
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;
        const startOffset = ev[clientOffset];
        const startThumbOffset = scrollbarThumb[offset];
        scrollbarThumb.classList.add("td-active");
        const onMouseMove = (ev2: MouseEvent) => {
            const scrollPosition =
                (startThumbOffset + ev2[clientOffset] - startOffset) /
                (scrollbar[clientSize] - scrollbarThumb[clientSize]);
            container[scrollOffset] = scrollPosition * (container[scrollSize] - container[clientSize]);
        };
        const onMouseUp = () => {
            scrollbarThumb.classList.remove("td-active");
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseup", onMouseUp);
    };

    const onScrollbarMouseDown = (ev: MouseEvent, scrollbar: HTMLElement, orientation: "x" | "y"): void => {
        ev.preventDefault();

        const [clientSize, scrollSize, scrollOffset, offsetAxis] =
            orientation === "x"
                ? (["clientWidth", "scrollWidth", "scrollLeft", "offsetX"] as const)
                : (["clientHeight", "scrollHeight", "scrollTop", "offsetY"] as const);
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;

        const scrollPosition =
            (ev[offsetAxis] - scrollbarThumb[clientSize] / 2) / (scrollbar[clientSize] - scrollbarThumb[clientSize]);
        container[scrollOffset] = scrollPosition * (container[scrollSize] - container[clientSize]);
    };

    container.classList.add("td-scrollbar-container");

    const scrollbarThumb = document.createElement("div");
    scrollbarThumb.classList.add("td-scrollbar-thumb");

    const scrollbarX = document.createElement("div");
    scrollbarX.appendChild(scrollbarThumb.cloneNode());
    scrollbarX.classList.add("td-scrollbar");
    scrollbarX.classList.add("td-scrollbar-x");

    const scrollbarY = document.createElement("div");
    scrollbarY.appendChild(scrollbarThumb.cloneNode());
    scrollbarY.classList.add("td-scrollbar");
    scrollbarY.classList.add("td-scrollbar-y");

    container.append(scrollbarX, scrollbarY);

    const handleScroll = () => {
        updateScrollbarThumb(scrollbarX, "x");
        updateScrollbarThumb(scrollbarY, "y");
    };
    container.addEventListener("scroll", handleScroll);
    container.addEventListener("mouseover", handleScroll);

    initScrollbarThumbListeners(scrollbarX, "x");
    initScrollbarThumbListeners(scrollbarY, "y");
};
