window.onload = () => {
  const canvas = document.querySelector('#canvas');
  const draw = canvas.getContext('2d');

  canvas.width = window.innerWidth || document.body.clientWidth;
  canvas.height = window.innerHeight || document.body.clientHeight;

  function calculateAimPoint(
    shooterLocation,
    targetLocation,
    targetVelocity,
    projectileSpeed
  ) {
    const distanceToTarget = targetLocation.sub(shooterLocation).length();

    // time needed for the projectile to reach current target's position
    const baseTime = distanceToTarget / projectileSpeed;

    // initial guess position of the target after the base time
    const initialAimGuess = targetLocation.add(targetVelocity.mult(baseTime));

    const distanceFromPlayerToAim = initialAimGuess
      .sub(shooterLocation)
      .length();

    const guessDiff = distanceFromPlayerToAim - distanceToTarget;
    const targetGuessRoad = initialAimGuess.sub(targetLocation).length();
    const ratio = distanceToTarget / targetGuessRoad;

    const targetActualDistance =
      (distanceFromPlayerToAim * guessDiff) / targetGuessRoad;
    console.log('targetActualDistance ' + targetActualDistance);

    const aimPoint = targetLocation.add(
      targetVelocity.normalize().mult(targetActualDistance)
    );

    return aimPoint;
  }

  function testTwoCriclesOverlap(vector1, vector2, radius) {
    const distance = Math.sqrt(
      Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2)
    );
    return distance <= radius + radius;
  }

  // Define starting positions and velocities
  const ShooterLocation = new Vector(0, 0);
  const TargetLocation = new Vector(400, 0);
  const TargetVelocity = new Vector(0, 150);
  const projectileSpeed = 200;

  // Calculate the aim point
  const AimPoint = calculateAimPoint(
    ShooterLocation,
    TargetLocation,
    TargetVelocity,
    projectileSpeed
  );

  const BulletLocation = ShooterLocation.copy();
  const bulletVelocity = AimPoint.sub(ShooterLocation)
    .normalize()
    .mult(projectileSpeed);

  const drawOffset = new Vector(200, 200);

  let lastTime = performance.now();
  let duration = 0;
  const update = () => {
    const frameStartTime = performance.now();
    const deltaSeconds = (frameStartTime - lastTime) * 0.001;
    draw.clearRect(0, 0, canvas.width, canvas.height);

    TargetLocation.addInPlace(TargetVelocity.mult(deltaSeconds));
    BulletLocation.addInPlace(bulletVelocity.mult(deltaSeconds));

    ShooterLocation.drawFill(draw, 'blue', drawOffset);
    TargetLocation.drawFill(draw, 'red', drawOffset);
    AimPoint.drawStroke(draw, 'green', drawOffset);
    BulletLocation.drawFill(draw, 'black', drawOffset);

    if (testTwoCriclesOverlap(TargetLocation, BulletLocation, 1)) {
      console.log('hit!');
      return;
    }

    duration += deltaSeconds;
    if (duration > 15) {
      console.log('time is up');
      return;
    }

    lastTime = frameStartTime;
    requestAnimationFrame(update);
  };

  update();
};
