function distance(a,b){
    return Math.hypot(
        b.x-a.x,
        b.y-a.y
    );
}

export function calculateMetrics(
{
    frontal
}
){

    const metrics=[];

    const faceWidth=
        distance(
            frontal[234],
            frontal[454]
        );

    const faceHeight=
        distance(
            frontal[10],
            frontal[152]
        );

    metrics.push({
        name:
          "Facial Height / Width Ratio",

        value:
          faceHeight/faceWidth,

        min:1.30,
        max:1.50
    });

    return metrics;
}

export function scoreMetric(
value,
min,
max
){

    const center=
      (min+max)/2;

    const width=
      (max-min)/2;

    const dev=
      Math.abs(value-center);

    return Math.max(
      0,
      Math.round(
        100-(dev/width)*100
      )
    );
}
