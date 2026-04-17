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
    DEBUG_LOGS: true,

    // When enabled, saves data locally
    DEBUG_SAVE: true
};

export const adaptationFaces = {
    trustworthy: [
        "images/adaptation/trustworthy1.png",
        "images/adaptation/trustworthy2.png",
        "images/adaptation/trustworthy3.png",
        "images/adaptation/trustworthy4.png",
    ],
    untrustworthy: [
        "images/adaptation/untrustworthy1.png",
        "images/adaptation/untrustworthy2.png",
        "images/adaptation/untrustworthy3.png",
        "images/adaptation/untrustworthy4.png",
    ]
};

export const ratingFaces = [
    "images/rating/face1.png",
    "images/rating/face2.png",
    "images/rating/face3.png",
    "images/rating/face4.png",
];

