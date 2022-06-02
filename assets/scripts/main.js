var body = document.querySelector("body");
var bodyAfter = document.querySelector("body::after");

// DEVICE MOTION FUNCTIONS (GYROSCOPE + COMPASS) --------------------------------
// DEVICE MOTION FUNCTIONS (GYROSCOPE + COMPASS) --------------------------------
function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener( "devicemotion", (e) => {

                    // IF PERMISSION IS GIVEN, HIDE OVERLAY
                    body.classList.add("sensors-allowed");
                    
                    // // alert( "DeviceMotionEvent is defined" );
                    // var detailedtiltDeviceX = e.accelerationIncludingGravity.x;
                    // var detailedtiltDeviceY = e.accelerationIncludingGravity.y;
                    // var detailedtiltDeviceZ = e.accelerationIncludingGravity.z;

                    // var tiltDeviceX = Math.round(detailedtiltDeviceX * 10) / 10;
                    // // var tiltDeviceXRounded = Math.round(detailedtiltDeviceX);
                    
                    
                    // console.log(tiltDeviceX);
                    // // console.log(accelerationTiltDeviceX);

                    


                    



                    
                    // MOVE BALL BASED ON SENSOR DATA --------------------------------
                    var ball = document.getElementById("ball");
                    var ballDiameter = 40;
                    var windowWidth = document.documentElement.clientWidth;
                    var windowHeight = document.documentElement.clientHeight;
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
                    velocityX *= 2.5;
                    velocityY *= 2.5;

                    // CHANGE BALL POSITION
                    positionX = positionX + velocityX;
                    positionY = positionY + velocityY;

                    checkFieldBounds();

                    ball.style.left = positionX + 'px';
                    ball.style.top = positionY + 'px';

                    console.log("Balpositie X: " + positionX);
                    console.log("Balpositie Y: " + positionY);
                    console.log(gravity);
                    
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



                    // BALL TEST --------------------------------
                    // var ball = document.getElementById("ball");
                    // var diameter = 40;

                    // var gravity = e.accelerationIncludingGravity;
                    // console.log(gravity.x);

                    // var positionX = ball.offsetLeft;
                    // var positionY = ball.offsetTop;

                    // console.log("X: " + positionX + " - Y: " + positionY);

                    // ball.style.transform = "translateX(calc(" + (gravity.x * 5) + "vw - 50%)) translateY(calc(" + (gravity.y * -5) + "vh - 50%))";
                    



                });
            }
        })
        .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
    }



    if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
                // (optional) Do something before API request prompt.
                DeviceOrientationEvent.requestPermission()
                    .then( response => {
                    // (optional) Do something after API prompt dismissed.
                    if ( response == "granted" ) {
                        window.addEventListener( "deviceorientation", (e) => {
                            // do something for 'e' here.
                            
                                var alpha = e.alpha;
                                var beta = e.beta;
                                var gamma = e.gamma;
                                // console.log('Orientation - Alpha: '+alpha+', Beta: '+beta+', Gamma: '+gamma);
                                // console.log("Richting (Z): " + alpha);
                              
        
                                if (alpha >= 0) {
                                    body.style.backgroundColor = "red";
                                }
                                if (alpha >= 90) {
                                    body.style.backgroundColor = "green";
                                }
                                if (alpha >= 180) {
                                    body.style.backgroundColor = "blue";
                                }
                                if (alpha >= 270) {
                                    body.style.backgroundColor = "yellow";
                                }
        
                                var test = document.querySelector("main > section:nth-of-type(1) div");
                                test.style.transform = "rotate(" + alpha + "deg)";
        
        
                                if (beta >= 65) {
                                    body.classList.add("tilting-locked");
                                    body.style.backgroundColor = "black";
                                } else {
                                    body.classList.remove("tilting-locked")
                                }
                                
        
        
        
        
        
                                
        
        
        
                        });
                    }
                })
                .catch( console.error )
            } else {
                alert( "DeviceMotionEvent is not defined" );
            }
}



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
  







// // DEVICE MOTION FUNCTIONS (GYROSCOPE + COMPASS)
// function permission () {
//     if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
//         // (optional) Do something before API request prompt.
//         DeviceOrientationEvent.requestPermission()
//             .then( response => {
//             // (optional) Do something after API prompt dismissed.
//             if ( response == "granted" ) {
//                 window.addEventListener( "deviceorientation", (e) => {
//                     // do something for 'e' here.
                    
//                         var alpha = e.alpha;
//                         var beta = e.beta;
//                         var gamma = e.gamma;
//                         // console.log('Orientation - Alpha: '+alpha+', Beta: '+beta+', Gamma: '+gamma);
//                         console.log("Richting (Z): " + alpha);
                      

//                         if (alpha >= 0) {
//                             body.style.backgroundColor = "red";
//                         }
//                         if (alpha >= 90) {
//                             body.style.backgroundColor = "green";
//                         }
//                         if (alpha >= 180) {
//                             body.style.backgroundColor = "blue";
//                         }
//                         if (alpha >= 270) {
//                             body.style.backgroundColor = "yellow";
//                         }

//                         var test = document.querySelector("main > section:nth-of-type(1) div");
//                         test.style.transform = "rotate(" + alpha + "deg)";



                        









//                 });
//             }
//         })
//         .catch( console.error )
//     } else {
//         alert( "DeviceMotionEvent is not defined" );
//     }
// }


var permissionRequestButton = document.querySelector("main > section.sensors-permission-overlay button");
permissionRequestButton.addEventListener( "click", permission);




// CLEAR CONSOLE LOG EVERY SECOND > PERFORMANCE ISSUES
setInterval(function(){
    console.clear();
}, 1000); 