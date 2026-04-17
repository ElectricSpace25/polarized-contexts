import { jsPsych } from './init.js';
import { adaptationFaces } from './config.js';

export function setupAdaptation() {
    const numHighlighted = 1;

    const faces = jsPsych.randomization.shuffle(adaptationFaces);

    const adaptationTimelineVariables = faces.map((path, index) => {
        let imgTag;

        if (index < numHighlighted) {
            imgTag = `<img src="${path}" class="highlighted-face">`;
        } else {
            imgTag = `<img src="${path}">`;
        }

        return {
            face: imgTag
        };
    });

    return jsPsych.randomization.shuffle(adaptationTimelineVariables);
}