import { jsPsych } from './init.js';
import { config, adaptationFaces } from './config.js';

export function setupAdaptation() {
    let adaptationTimelineVariables = [];

    for (let i = 0; i < config.NUM_ADAPTATION_REPETITIONS; i++) {
        // Shuffle faces
        const shuffledFaces = jsPsych.randomization.shuffle(adaptationFaces);

        // Add img tag and highlight class
        const formattedFaces = shuffledFaces.map((path, index) => {
            const imgTag = index < config.NUM_HIGHLIGHTED_FACES
                ? `<img src="${path}" class="highlighted-face">`
                : `<img src="${path}">`;

            return { face: imgTag };
        });

        // Shuffle again
        const finalFaces = jsPsych.randomization.shuffle(formattedFaces);

        // Add to list
        adaptationTimelineVariables = adaptationTimelineVariables.concat(finalFaces);
    }

    console.log(adaptationTimelineVariables);

    return adaptationTimelineVariables;
}