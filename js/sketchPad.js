class sketchPad {
    constructor(container, height=500, width=600) {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style = `
            background-color: white;
            box-shadow: 0 0 5px 2px black;
        `;
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoButton = document.createElement("button");
        this.undoButton.innerHTML = "UNDO";

        this.resetButton = document.createElement("button");
        this.resetButton.innerHTML = "RESET";
        
        container.appendChild(this.undoButton);
        container.appendChild(this.resetButton);
        
        this.reset();

        this.#addEventListeners();
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#reDraw();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }

        this.canvas.onmousemove = (event) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(event);
                const lastPath = this.paths[this.paths.length-1]
                lastPath.push(mouse);
                console.log(this.paths.length);
                this.#reDraw();
            }
        }

        document.onmouseup = () => {
            this.isDrawing = false;
        }

        this.canvas.ontouchstart = (event) => {
            const touch = event.touches[0];
            this.canvas.onmousedown(touch);
        }

        this.canvas.ontouchmove = (event) => {
            const touch = event.touches[0];
            this.canvas.onmousemove(touch);
        }

        document.ontouchend = () => {
            this.canvas.onmouseup();
        }

        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#reDraw();
        }

        this.resetButton.onclick = () => {
            this.reset();
        }
    }

    #reDraw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        draw.paths(this.ctx,this.paths);
        if (this.paths.length > 0) {
            this.undoButton.disabled = false;
            this.resetButton.disabled = false;
        }
        else {
            this.undoButton.disabled = true;
            this.resetButton.disabled = true;
        }
    }

    #getMouse = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(event.clientX - rect.left),
            Math.round(event.clientY - rect.top)
        ];
    }
}