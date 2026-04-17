import { jsPsych } from './init.js';
import { config, adaptationFaces } from './config.js';

export function setupAdaptation() {
    const faces = jsPsych.randomization.shuffle(adaptationFaces);

    const adaptationTimelineVariables = faces.map((path, index) => {
        let imgTag;

        if (index < config.NUM_HIGHLIGHTED_FACES) {
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