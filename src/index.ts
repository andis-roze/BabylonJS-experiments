import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { PlaneBuilder } from "@babylonjs/core/Meshes/Builders/planeBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";

export class DonutContainer {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: UniversalCamera;

    public constructor(canvasElement: string) {
        if (!Engine.isSupported) {
            throw new Error("Not supported!");
        }

        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new Engine(this.canvas, true);
        this.engine.setSize(500, 500);
        this.scene = new Scene(this.engine);
        this.camera = new UniversalCamera("camera", new Vector3(0, 0, -2), this.scene);
        this.camera.setTarget(Vector3.Zero());
        // this.camera.fov = 0;
        this.initScene();
    }

    public doRender(): void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // window.addEventListener("resize", () => {
        //     this.engine.resize();
        // });
    }

    private initScene(): void {
        const plane = PlaneBuilder.CreatePlane("plane", { size: 1 }, this.scene);
        const material = new StandardMaterial("Material", this.scene);
        const dynamicTexture = new DynamicTexture("dynamicTexture", 512, this.scene, true);

        plane.position = new Vector3(0, 0, 0);
        dynamicTexture.hasAlpha = true;
        material.emissiveColor = Color3.White();
        material.diffuseTexture = dynamicTexture;
        plane.material = material;

        this.scene.registerBeforeRender(() => {
            const textureContext = dynamicTexture.getContext();
            const size = dynamicTexture.getSize();
            textureContext.clearRect(0, 0, size.width, size.height);
            this.drawDonut(textureContext);
            dynamicTexture.update();
        });
    }

    private drawDonut(ctx: CanvasRenderingContext2D): void {
        const outerRadius = 25;
        const innerRadius = 10;
        const endAngle = Math.PI * 2;
        const startAngle = Math.PI;
        const color = "red";

        ctx.strokeStyle = "black";
        ctx.fillStyle = color;
        ctx.beginPath();
        // Outer arc: counter clockwise
        ctx.arc(
            outerRadius,
            outerRadius,
            outerRadius,
            startAngle,
            endAngle,
            false
            );
        // Inner arc: clockwise
        ctx.arc(
            outerRadius,
            outerRadius,
            innerRadius,
            endAngle,
            startAngle,
            true
            );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}


document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        let donutContainer = new DonutContainer("canvas");
        donutContainer.doRender();
    }
};
