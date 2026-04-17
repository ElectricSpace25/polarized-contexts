export const config = {

    // Number of faces to highlight in adaptation trials
    NUM_HIGHLIGHTED_FACES: 1,

    // Number of times to repeat the set of faces in adaptation trials (shuffled each time)
    NUM_ADAPTATION_REPETITIONS: 5,
    
    // Link participants click after completing the study
    COMPLETION_LINK: "https://app.prolific.co/submissions/complete?cc=????????",

    // Link participants click after completing the study
    FAILURE_LINK: "https://app.prolific.co/submissions/complete?cc=????????",
    
    // When enabled, logs debug messages to console
    DEBUG_LOGS: false,

    // When enabled, saves data locally
    DEBUG_SAVE: false
};

export const adaptationFaces = [
    "images/adaptation/face1.png",
    "images/adaptation/face2.png"
];

export const ratingFaces = [
    "images/rating/face3.png",
    "images/rating/face4.png",
];

