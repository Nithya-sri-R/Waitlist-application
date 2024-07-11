import paper from "paper";
import React, { useEffect } from "react";

const CanvasAnimation = () => {
  useEffect(() => {
    paper.install(window);
    paper.setup(document.getElementById("canvas"));

    const shapeGroup = new paper.Group();
    const positionArray = [
      { x: 150, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 150 },
      { x: 400, y: 200 },
      { x: 500, y: 250 },
      { x: 600, y: 300 },
    ];

    const shapePathData = [
      'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
      'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z',
      'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z',
      'M333,0L0,94l64,219L29,437l570-151l-196-42L333,0',
      'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
      'M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352',
    ];

    for (let i = 0; i < shapePathData.length; i++) {
      const shape = new paper.Path({
        strokeColor: 'rgba(255, 255, 255, 0.5)',
        strokeWidth: 2,
        parent: shapeGroup,
        pathData: shapePathData[i],
      });

      shape.scale(2);
      shape.position = positionArray[i];
    }

    paper.view.onFrame = (event) => {
      if (event.count % 4 === 0) {
        shapeGroup.children.forEach((child, index) => {
          child.rotate(index % 2 === 0 ? -0.1 : 0.1);
        });
      }
    };

    paper.view.onResize = () => {
      shapeGroup.children.forEach((child, index) => {
        child.position = positionArray[index];
      });
    };
  }, []);

  return <canvas id="canvas" className="canvas-back"></canvas>;
};

export default CanvasAnimation;
