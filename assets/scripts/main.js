// GLOBAL VARIABLES --------------------------------
// GLOBAL VARIABLES --------------------------------

// GENERAL
var body = document.querySelector("body");
var bodyAfter = document.querySelector("body::after");

// LANDING
var landingSnapPoint = 65;
var landing = document.querySelector("main > section:nth-of-type(1)");
var landingLogo = document.querySelector("main > section:nth-of-type(1) figure");
var landingBG = document.querySelector("main > section:nth-of-type(1) div");
var landingH3 = document.querySelector("main > section:nth-of-type(1) h3");
var landingP = document.querySelector("main > section:nth-of-type(1) p");

// MULTIPLE OPINIIONS
var multipleOpinionsAmount = 8;
var multipleOpinionsOffset = 360 / multipleOpinionsAmount;
var multipleOpinionsSection = document.querySelector("main > section.multiple-opinions");
var multipleOpinions = document.querySelectorAll("main > section.multiple-opinions ul li");
var multipleOpinionsBG = document.querySelectorAll("main > section.multiple-opinions ul li div");
var multipleOpinionsBGLogoHint = document.querySelector("main > section.multiple-opinions section");
var shortOpnions = [
    "De omstreden mensenrechten in Qatar verdienen geen wereldwijd podium.",
    "Voetbal heeft de kracht om landen en volken te verbinden. Niet deelnemen, zal al helemaal niets veranderen aan de omstandigheden in Qatar.",
    "Het is beter om wel naar Qatar te gaan en druk uit te oefenen op de autoriteiten voor hervormingen.",
    "De kosten van €30 miljard om airco-gekoelde stadions te bouwen, is volstrekt absurd met de huidige klimaatcrisis."
];

// FOOTBALL FIELD
var ballDiameter = 20;
var footballField = document.querySelector("main > section.football-field");
var ball = document.querySelector("#ball");
var ballGraphics = document.querySelector("#ball > div");
var goalTop = document.querySelector("main > section.football-field > div:nth-of-type(2) > div:nth-of-type(1) > div");
var goalBottom = document.querySelector("main > section.football-field > div:nth-of-type(2) > div:nth-of-type(3) > div");
var fieldCircle = document.querySelector("main > section.football-field > div:nth-of-type(2) > div:nth-of-type(2)");
var fieldOpinionTop = document.querySelector("main > section.football-field > div:nth-of-type(1) p");
var fieldOpinionBottom = document.querySelector("main > section.football-field > div:nth-of-type(3) p");
var fieldGoals = [];

// YOUR OPINION
var yourOpinion = document.querySelector("main > section.your-opinion");
var yourOpinionBG = document.querySelector("main > section.your-opinion > div");



// DEVICE MOTION FUNCTIONS (GYROSCOPE + COMPASS) --------------------------------
// DEVICE MOTION FUNCTIONS (GYROSCOPE + COMPASS) --------------------------------
function permission () {
    // DEVICE MOTION --------------------------------
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // IF PERMISSION IS DENIED
            body.classList.add("sensors-denied");

            if ( response == "granted" ) {
                window.addEventListener( "devicemotion", (e) => {

                    // IF PERMISSION IS GIVEN, HIDE OVERLAY
                    body.classList.add("sensors-allowed");

                    // GET WINDOW HEIGHT AND WIDTH
                    var windowWidth = document.documentElement.clientWidth;
                    var windowHeight = document.documentElement.clientHeight;

                    
                    // MOVE BALL BASED ON SENSOR DATA --------------------------------
                    console.log("Breedte: " + windowWidth + " Hoogte: " + windowHeight);

                    // GET DATA FROM GYRO SENSORS
                    var gravity = e.accelerationIncludingGravity;
                    
                    // GET BALL POSITION
                    var positionX = ball.offsetLeft;
                    var positionY = ball.offsetTop;

                    // BALL ACCELERATION
                    var accelerationX = gravity.x;
                    var accelerationY = gravity.y;

                    // BALL VELOCITY
                    var velocityX = 0;
                    var velocityY = 0;
                    velocityX += accelerationX;
                    velocityY -= accelerationY;
                    velocityX *= 3.5;
                    velocityY *= 3.5;

                    // CHANGE BALL POSITION
                    positionX = positionX + velocityX;
                    positionY = positionY + velocityY;

                    // POSITIONS AND WIDTH (TOP GOAL)
                    var goalTopPositionX = goalTop.getBoundingClientRect().left;
                    var goalTopPositionY = goalTop.getBoundingClientRect().top;
                    var goalTopWidth = goalTop.getBoundingClientRect().width;
                    var goalTopPositionXAndWidth = goalTopPositionX + goalTopWidth;
                    var goalTopPositionXAndBallCorrection = goalTopPositionXAndWidth - ballDiameter;
                    var goalTopHeight = goalTop.getBoundingClientRect().height;
                    var goalTopPositionYAndHeight = goalTopPositionY + goalTopHeight;
                    var goalTopPositionYAndBallCorrection = goalTopPositionYAndHeight - ballDiameter;

                    // POSITIONS AND WIDTH (BOTTOM GOAL)
                    var goalBottomPositionX = goalBottom.getBoundingClientRect().left;
                    var goalBottomPositionY = goalBottom.getBoundingClientRect().top;
                    var goalBottomWidth = goalBottom.getBoundingClientRect().width;
                    var goalBottomPositionXAndWidth = goalBottomPositionX + goalBottomWidth;
                    var goalBottomPositionXAndBallCorrection = goalBottomPositionXAndWidth - ballDiameter;
                    var goalBottomHeight = goalBottom.getBoundingClientRect().height;
                    var goalBottomPositionYAndHeight = goalBottomPositionY + goalBottomHeight;
                    var goalBottomPositionYAndBallCorrection = goalBottomPositionYAndHeight - ballDiameter;
                    // console.log(goalBottomPositionYAndHeight)

                    // GOAL TOP
                    if (positionX > goalTopPositionX && positionX < goalTopPositionXAndBallCorrection) {
                        // TOP COLLISION
                        if (positionY < goalTopPositionY && goalBottomPositionYAndHeight > positionY) {
                            // ADD CLASS TO PARENT
                            footballField.classList.add("scored");
                            footballField.classList.add("scored-top");
                            footballField.classList.remove("scored-bottom");
                            
                            // LOCK POSITION (X)
                            positionX = (windowWidth / 2) - (ballDiameter / 2);
                            velocityX *= -1;

                            // LOCK POSITION (Y)
                            positionY = goalTopPositionYAndBallCorrection;
                            velocityY *= -1;

                            console.log("GOAALLL | Bottom goal");                            
                        }
                    }
                    
                    // GOAL BOTTOM
                    if (positionX > goalBottomPositionX && positionX < goalBottomPositionXAndBallCorrection) {
                        // BOTTOM COLLISION
                        if (positionY > goalBottomPositionY && positionY <= (goalBottomPositionYAndHeight + ballDiameter)) {
                            // ADD CLASS TO PARENT
                            footballField.classList.add("scored");
                            footballField.classList.add("scored-bottom");
                            footballField.classList.remove("scored-top");
                            
                            // LOCK POSITION (X)
                            positionX = (windowWidth / 2) - (ballDiameter / 2);
                            velocityX *= -1;

                            // LOCK POSITION (Y)
                            positionY = goalBottomPositionYAndBallCorrection;
                            velocityY *= -1;

                            console.log("GOAALLL | Bottom goal");                            
                        }
                    }

                    // CIRCLE (MIDDLE OF FIELD)
                    var fieldCircleRadius = fieldCircle.getBoundingClientRect().width;
                    var fieldCircleX = fieldCircle.getBoundingClientRect().left;
                    var fieldCircleXAndRadius = fieldCircleX + fieldCircleRadius;
                    var fieldCircleY = fieldCircle.getBoundingClientRect().top;
                    var fieldCircleYAndRadius = fieldCircleY + fieldCircleRadius;
                    
                    // CHECK IF SCORED AND IF BALL IS IN CIRCLE
                    if (footballField.classList.contains("scored")) {
                        if ((positionX > fieldCircleX && positionX < (fieldCircleXAndRadius - ballDiameter)) && (positionY > fieldCircleY && positionY < (fieldCircleYAndRadius - ballDiameter))) {
                            footballField.classList.add("kick-off");

                            // COUNT UPWARDS (PROGRESSING DELAY)
                            fieldCircleTimer += 1;

                            // IF BALL IS IN CIRCLE FOR OVER A SECOND
                            if (fieldCircleTimer > 150) {
                                footballField.classList.add("kick-off-approved");
                                
                                // CHANGE OPINIONS
                                setTimeout(() => {
                                    if (footballField.classList.contains("scored-bottom")) {
                                        fieldOpinionTop.textContent = shortOpnions[2];
                                        fieldOpinionBottom.textContent = shortOpnions[3];
                                    } else {
                                        fieldOpinionTop.textContent = shortOpnions[1];
                                        fieldOpinionBottom.textContent = shortOpnions[3];
                                    }
                                    if (footballField.classList.contains("scored-top")) {
                                        footballField.classList.add("score-overview");
                                        yourOpinion.classList.add("visible");
                                    }
                                }, "2500");

                                // CHANGE FIELD & RESET GOALS
                                setTimeout(() => {
                                    footballField.classList.remove("kick-off-approved");
                                    footballField.classList.remove("kick-off");
                                    footballField.classList.remove("scored");
                                    footballField.classList.remove("scored-bottom");
                                    footballField.classList.remove("scored-top");
                                }, "5500");
                            }
                        } else {
                            footballField.classList.remove("kick-off");
                            fieldCircleTimer = 0;
                        }  
                    }

                    // CHECK BOUNDARIES (SCREEN)
                    checkFieldBounds();

                    // CHANGE POSTION OF BALL
                    ball.style.left = positionX + 'px';
                    ball.style.top = positionY + 'px';
                    console.log("Balpositie X: " + positionX);
                    console.log("Balpositie Y: " + positionY);
                    
                    // CHECK IF BALL IS NEAR BORDERS OF FIELD / SCREEN 
                    function checkFieldBounds() {
                        if (positionX < 0 ) {
                            positionX = 0;
                            velocityX *= -1;
                        }
                        if (positionY < 0) {
                            positionY = 0;
                            velocityY *= -1;
                        }
                        if (positionX > windowWidth - ballDiameter) {
                            positionX = windowWidth - ballDiameter;
                            velocityX *= -1;
                        }
                        if (positionY > windowHeight - ballDiameter) {
                            positionY = windowHeight - ballDiameter;
                            velocityY *= -1;
                        }
                    }


                    // GOAL FUNCTIONS --------------------------------
                    // CHECK IF SCORED (BOTTOM GOAL)
                    function checkGoalBottom() {
                        if (positionX > (goalBottomPositionX + 1) && positionX < (goalBottomPositionXAndBallCorrection - 1)) {

                            // BOTTOM COLLISION
                            if (positionY > goalBottomPositionY && positionY < (goalBottomPositionYAndHeight + ballDiameter)) {
                                positionY = goalBottomPositionYAndBallCorrection;
                                velocityY *= -1;
                                console.log("GOAAL");

                                // LEFT COLLISION
                                if (positionX <= (goalBottomPositionX + 10)) {
                                    positionX = goalBottomPositionX + 10;
                                    velocityX *= -1;
                                    positionY = goalBottomPositionYAndBallCorrection;
                                    velocityY *= -1;
                                }
                            }


                            // if (positionY > goalBottomPositionY && positionY < goalBottomPositionYAndHeight) {
                            //     footballField.classList.add("scored-bottom");

                            //     // KEEP BALL IN GOAL
                            //     positionY = goalBottomPositionYAndBallCorrection;
                            //     velocityY = 0;
                            //     accelerationY = 0;
                            //     // gravity = 0;


                            //     // var positionXRounded = Math.round(positionX);
                            //     // var goalBottomPositionXRounded = Math.round(goalBottomPositionX);
                            //     if (positionX <= goalBottomPositionX) {

                            //         console.log("MAN " + positionX);

                            //         positionX = positionX + 0;
                            //         positionY = positionY + 0;

                            //         positionX = 180;
                            //         velocityX *= -1;
                            //         // accelerationX = 0;


                            //         console.log("LOCKKKK NUUUUUU : " + positionXRounded +  ' & ' + goalBottomPositionXRounded);

                            //     }


                                
                            // }
                            // else {
                            //     // footballField.classList.remove("scored-bottom");
                            // }
                            // footballField.classList.add("scored-bottom");
                        } 


                        


                        console.log(goalBottomPositionX + " / " + goalBottomPositionXAndWidth);
                    }

                    


                    





                    // GOAL FUNCTIONS
                    


                    // CHANGE BALL GRAPHICS, BASED ON POSITION --------------------------------
                    var ballGraphicsX = positionX * 4250;
                    var ballGraphicsY = positionY * -10;
                    ballGraphics.style.backgroundPosition = ballGraphicsX + "% " + ballGraphicsY + "%";


        


                });
            }
        })
        .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
    }


    // DEVICE ORIENTATION --------------------------------
    if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceOrientationEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
    
            if ( response == "granted" ) {
                window.addEventListener( "deviceorientation", (e) => {

                    // GET WINDOW HEIGHT AND WIDTH
                    // var windowWidth = document.documentElement.clientWidth;
                    // var windowHeight = document.documentElement.clientHeight;

                    // GET ROTATION VALUES
                    var rotateZ = e.alpha; // 0 TO 360 DEG
                    var rotateX = e.beta; // -180 TO 180 DEG
                    var rotateY = e.gamma; // -90 TO 90 DEG

                    // ADJUST ROTATION VALUES (NO DECIMALS)
                    var rotateZRounded = Math.round(rotateZ);
                    var rotateXRounded = Math.round(rotateX);
                    var rotateYRounded = Math.round(rotateY);
                    // console.log(rotateZRounded);

                
                    // if (alpha >= 0) {
                    //     body.style.backgroundColor = "red";
                    //     // multipleOpinions.classList.remove("rotate");
                    // }
                    // if (alpha >= 90) {
                    //     body.style.backgroundColor = "green";
                    // }
                    // if (alpha >= 180) {
                    //     body.style.backgroundColor = "blue";
                    //     // multipleOpinions.classList.add("rotate");
                    // }
                    // if (alpha >= 270) {
                    //     body.style.backgroundColor = "yellow";
                    // }

                    // var yep = ((rotateX * rotateX) * 0.003) * 2;
                    // landingLogo.style.transform = "translateY(" + yep + "vh)";

                    var landingLogoOpacityData = (rotateX / landingSnapPoint);
                    var landingLogoOpacity = 100 - (landingLogoOpacityData * (rotateX * rotateX) / 40);
                    var landingLogoMoveDown = 0 + (landingLogoOpacityData * (rotateX * rotateX) / 40);
                    var landingLogoRotateBackwards = 0 + (landingLogoOpacityData * (rotateX * rotateX) / 100);
                    var landingH3MoveDown = landingLogoMoveDown * 0.25;
                    var landingH3Opacity = landingLogoOpacity - 15;
                    var landingPMoveDown = landingLogoMoveDown * 0.15;
                    var landingPOpacity = landingLogoOpacity - 25;

                    landingLogo.style.opacity = landingLogoOpacity + "%";
                    landingLogo.style.transform = "translateY(" + landingLogoMoveDown + "px) rotateX(" + landingLogoRotateBackwards + "deg)";
                    landingH3.style.opacity = landingH3Opacity + "%";
                    landingH3.style.transform = "translateY(" + landingH3MoveDown + "px)";
                    landingP.style.opacity = landingPOpacity + "%";
                    landingP.style.transform = "translateY(" + landingPMoveDown + "px)";


                    // MAKE CORRECT SECTION VISIBLE --------------------------------
                    if (rotateX >= landingSnapPoint) {
                        landing.classList.add("hidden");

                        if (!footballField.classList.contains("visible")) {
                            multipleOpinionsSection.classList.add("visible");
                        }
                    } 
                    if (landing.classList.contains("hidden")) {
                        if (rotateX < 25) {
                            body.classList.add("tilting-warning-down");
                        } else {
                            body.classList.remove("tilting-warning-down");
                        }
                        if (rotateX < 5) {
                            footballField.classList.add("visible");
                            multipleOpinionsSection.classList.remove("visible");
                        }
                    }

 
                    // TILTING WARNING (X-ROTATION TO MUCH FOR ACCURATE READING) --------------------------------
                    if (rotateX >= 80) {
                        body.classList.add("tilting-warning");
                    } else {
                        body.classList.remove("tilting-warning");
                    }


                    // MULTIPLE OPINIIONS (3D CAROUSEL) --------------------------------
                    for (var i = 0; i < multipleOpinions.length; i++) {
                        // 3D CUBE EFFECT (CHANGE ON DIRECTION)
                        var multipleOpinionsIndex = i + 1;
                        var multipleOpinionsFullRotation = rotateZ * -0.5;
                        var multipleOpinionsSpecificOffset = multipleOpinionsOffset * multipleOpinionsIndex;
                        var multipleOpinionsSpecificRotation = multipleOpinionsFullRotation + multipleOpinionsSpecificOffset;
                        var multipleOpinionsSpecificRotationX = 185 + ((rotateXRounded * rotateXRounded) * -0.001);
                        multipleOpinions[i].style.transform = "translateZ(100vw) rotateY(" + multipleOpinionsSpecificRotation + "deg) translateZ(100vw) rotateX(" + multipleOpinionsSpecificRotationX + "deg) rotateZ(180deg)";
                        // multipleOpinions[i].style.transform = "translateZ(100vw) rotateY(" + multipleOpinionsSpecificRotation + "deg) translateZ(100vw) rotateX(180deg) rotateZ(180deg)";

                        // BACKGROUND PATTERN PARALLAX EFFECT
                        var multipleOpinionsBGPositionX = (rotateZRounded / 360) * -100;
                        var multipleOpinionsBGPositionY = (rotateXRounded / 180) * -12.5;
                        multipleOpinionsBG[i].style.backgroundPosition = multipleOpinionsBGPositionX + "% " + multipleOpinionsBGPositionY + "%";
                        // console.log("BG Pattern: (X)" + multipleOpinionsBGPositionX + " (Y) " + multipleOpinionsBGPositionY);
                    }


                    // LANDING BACKGROUND --------------------------------
                    var landingBGPositionX = (rotateZRounded / 360) * -100;
                    var landingBGPositionY = (rotateXRounded / 180) * -25;
                    landingBG.style.backgroundPosition = landingBGPositionX + "% " + landingBGPositionY + "%";


                    // YOUR OPINION BACKGROUND --------------------------------
                    var yourOpinionBGPositionX = (rotateZRounded / 360) * -100;
                    var yourOpinionBGPositionY = (rotateXRounded / 180) * -25;
                    yourOpinionBG.style.backgroundPosition = yourOpinionBGPositionX + "% " + yourOpinionBGPositionY + "%";
 
                    

                });
            }
        })
        .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
    }
}


// REFRESH PAGE ON BUTTON CLICK
function refreshPage(){
    window.location.reload();
} 

// REQUEST SENSOR PERMISSION ON BUTTON CLICK 
var permissionRequestButton = document.querySelector("main > section.sensors-permission-overlay button");
permissionRequestButton.addEventListener( "click", permission);

// GET USER INFO (IPHONE ONLY)
var authorORUser = document.querySelector("main > section.sensors-permission-overlay strong");
authorORUser.addEventListener( "click", switchUserInfo );

function switchUserInfo() {
    authorORUser.classList.toggle("user-info");
    iosVersion = iOSversion();

    if (!authorORUser.classList.contains("user-info")) {
        authorORUser.textContent = window.navigator.platform + " (iOS " + iosVersion + ")";
    } else {
        authorORUser.textContent = "Rowin Schmidt";
    }
}

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var ios = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(ios[1], 10), parseInt(ios[2], 10), parseInt(ios[3] || 0, 10)];
    }
}
  

// CLEAR CONSOLE LOG EVERY SECOND > FIXING PERFORMANCE ISSUES
setInterval(function(){
    console.clear();
}, 1000); 






