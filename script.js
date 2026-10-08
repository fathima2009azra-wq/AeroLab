// =========================
// AEROLAB - FLIGHT LAB
// =========================

const speedSlider = document.getElementById("speed");
const angleSlider = document.getElementById("angle");

const speedValue = document.getElementById("speedValue");
const angleValue = document.getElementById("angleValue");

const liftValue = document.getElementById("liftValue");
const dragValue = document.getElementById("dragValue");

const aircraft = document.getElementById("aircraft");
const runButton = document.getElementById("runExperiment");
const missionStatus = document.getElementById("missionStatus");
const mission2Status = document.getElementById("mission2Status");

// Calculate the flight data
function updateFlightData() {

    const speed = Number(speedSlider.value);
    const angle = Number(angleSlider.value);

    // Educational simplified model
    const lift = Math.round(
        0.04 * speed * speed * (1 + angle / 10)
    );

    const drag = Math.round(
        lift * (0.15 + angle / 100)
    );

    // Update numbers on screen
    speedValue.textContent = speed + " km/h";
    angleValue.textContent = angle + "°";

    liftValue.textContent = lift + " N";
    dragValue.textContent = drag + " N";

    // Tilt the aircraft slightly as wing angle changes
    const rotation = (angle - 5) * 2.5;

// Higher lift → aircraft moves upward
const verticalMovement = Math.max(-80, -(lift - 500) / 10);

aircraft.style.transform =
    `translateY(${verticalMovement}px) rotate(${rotation}deg)`;

    // Change mission status
    if (lift >= 500) {
    liftValue.style.color = "#55e6c1";
    missionStatus.textContent = "🟢 MISSION COMPLETE! You generated enough lift.";
    missionStatus.style.color = "#55e6c1";
} else {
    liftValue.style.color = "white";
    missionStatus.textContent = "🟠 Keep experimenting! You need more lift.";
    missionStatus.style.color = "#ffb86c";
}
if (lift >= 500 && drag < 100) {
    mission2Status.textContent =
        "🟢 MISSION COMPLETE! You balanced lift and drag.";
    mission2Status.style.color = "#55e6c1";
} else {
    mission2Status.textContent =
        "🟠 Find the right flight conditions.";
    mission2Status.style.color = "#ffb86c";
}
}

// Update values when sliders move
speedSlider.addEventListener("input", updateFlightData);
angleSlider.addEventListener("input", updateFlightData);

// Run experiment button
runButton.addEventListener("click", function () {

    const lift = Number(
        liftValue.textContent.replace(" N", "")
    );

    if (lift >= 500) {
        alert(
            "🚀 MISSION COMPLETE!\n\n" +
            "You generated " + lift +
            " N of lift. The aircraft has enough lift for the challenge!"
        );
    } else {
        alert(
            "✈️ Keep experimenting!\n\n" +
            "Current lift: " + lift +
            " N\n\n" +
            "Try increasing the airspeed or adjusting the wing angle."
        );
    }
});

// Set initial values
updateFlightData();
