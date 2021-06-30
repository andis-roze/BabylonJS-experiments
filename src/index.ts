import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { PlaneBuilder } from "@babylonjs/core/Meshes/Builders/planeBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { Control } from "@babylonjs/gui/2D";

export class Application {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private plane!: Mesh;
    private planeWidth!: number;
    private camera: UniversalCamera;
    private renderWidth = 0;
    private renderHeight = 0;
    private currentMouseX = 0;
    private fpsText!: TextBlock;

    public constructor(canvas: HTMLCanvasElement) {
        if (!Engine.isSupported) {
            throw new Error("Not supported!");
        }

        this.canvas =  canvas;
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);
        this.renderWidth = this.engine.getRenderWidth();
        this.renderHeight = this.engine.getRenderHeight();
        this.currentMouseX = this.renderWidth / 2;
        
        this.camera = new UniversalCamera("camera", new Vector3(0, 0, -1), this.scene);
        this.camera.setTarget(Vector3.Zero());
        this.camera.mode = UniversalCamera.ORTHOGRAPHIC_CAMERA;
        this.camera.attachControl(this.canvas, true);
        
        this.initFps();
        this.initPlane();
        this.initOnResize();
        this.initCameraControl();
    }

    private initFps(): void {
        const advancedDynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI"); 

        this.fpsText = new TextBlock();
        this.fpsText.text = `${Math.floor(this.engine.getFps())} FPS`;
        this.fpsText.color = "black";
        this.fpsText.fontSize = 18;
        this.fpsText.width = "65px";
        this.fpsText.height = "20px";
        advancedDynamicTexture.addControl(this.fpsText);
        this.fpsText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.fpsText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    }

    private initPlane(): void {
        const texture = new Texture("./assets/meadow.jpg", this.scene);

        Texture.WhenAllReady([texture], () => {
            const { width: textureWidth, height: textureHeight } = texture.getSize();
            const ratio = textureWidth / textureHeight;
            const standardMaterial = new StandardMaterial("planeMaterial", this.scene);
            
            this.planeWidth = this.renderHeight * ratio;
            this.plane = PlaneBuilder.CreatePlane("plane", { width: this.planeWidth, height: this.renderHeight }, this.scene);
            
            standardMaterial.emissiveTexture = texture;
            this.plane.material = standardMaterial;
        });
    }

    private initOnResize(): void {
        window.addEventListener("resize", () => {
            const prevRenderHeight = this.engine.getRenderHeight();
            
            this.engine.resize();

            const currentRenderHeight = this.engine.getRenderHeight();
            const scale = currentRenderHeight / prevRenderHeight;

            this.renderWidth = this.engine.getRenderWidth();
            this.renderHeight = currentRenderHeight;
            this.currentMouseX = this.renderWidth / 2;
            this.planeWidth *= scale;
            this.camera.position.x *= scale;
            this.plane.scaling = this.plane.scaling.multiplyByFloats(scale, scale, 1);
        });
    }

    private initCameraControl() {
        this.canvas.onmousemove = this.onMouseMove;
        this.canvas.onmouseout = this.onMouseOut;
        this.canvas.ontouchmove = this.onTouchMove;
        this.canvas.ontouchend = this.onTouchEnd;
    }

    private moveCamera() {
        const relativeMouseX = this.currentMouseX / this.renderWidth;
        const maxSpeed = 10;
        const leftBoundary = 0.45;
        const rightBoundary = 0.55;

        if (relativeMouseX < leftBoundary && this.camera.position.x > -this.planeWidth / 2 + this.renderWidth / 2 ) {
            this.camera.position.x += maxSpeed * (leftBoundary - relativeMouseX) / -leftBoundary;
        }

        if (relativeMouseX > rightBoundary && this.camera.position.x < this.planeWidth / 2 - this.renderWidth / 2) {
            this.camera.position.x += maxSpeed * (relativeMouseX - rightBoundary) / rightBoundary;
        }
    }

    private onMouseMove = (e: MouseEvent) => {
        this.currentMouseX = e.clientX;
    }

    private onMouseOut = (e: MouseEvent) => {
        this.currentMouseX = this.renderWidth / 2;
    }

    private onTouchMove = (e: TouchEvent) => {
        if (e.touches && e.touches.length) {
            this.currentMouseX = e.touches[0].clientX;
        }
    }

    private onTouchEnd = (e: TouchEvent) => {
        if (e.touches && e.touches.length) {
            this.currentMouseX = this.renderWidth / 2;
        }
    }

    public render(): void {
        this.engine.runRenderLoop(() => {
            this.fpsText.text = `${Math.floor(this.engine.getFps())} FPS`;
            this.scene.render();
            this.moveCamera();
        });
    }
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;

        const application = new Application(canvas);
        application.render();
    }
};
