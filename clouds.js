function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

export function createCloud(x, y, w, h, circles, color, speed) {
	const halfW = w / 2;
	const halfH = h / 2;
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	canvas.width = w;
	canvas.height = h;

	for (let i = 0; i < circles; i++) {
		const scale = Math.random() * 0.75,
			direction = Math.random() * Math.PI * 2,
			xShift = Math.cos(direction) * scale * halfW,
			yShift = Math.sin(direction) * scale * halfH,
			circleX = halfW + xShift,
			circleY = halfH + yShift,
			maxRadius = Math.min(halfW - Math.abs(xShift), halfH - Math.abs(yShift)),
			circleRadius = maxRadius * getRandom(0.5, 1);

		const gradient = context.createRadialGradient(circleX, circleY, 0, circleX, circleY, circleRadius);
		const gradientColor = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", ";

		gradient.addColorStop(0, gradientColor + color.a + ")");
		gradient.addColorStop(1, gradientColor + "0)");

		context.fillStyle = gradient;

		context.beginPath();
		context.arc(circleX, circleY, circleRadius, 0, Math.PI * 2, true);
		context.fill();
		// context.stroke();
	}

	const cloud = {
		x,
		y,
		w,
		h,
		speed,
		color,
		canvas
	};

	return cloud;
}

export function drawCloud(cloud, context) {
	context.drawImage(cloud.canvas, cloud.x - cloud.w / 2, cloud.y - cloud.h / 2);
	// context.beginPath();
	// context.rect(cloud.x - cloud.w / 2, cloud.y - cloud.h / 2, cloud.w, cloud.h);
	// context.stroke();
}

export default class Clouds {
	#clouds = [];
	#wind = 0;
	#sky = "rgba(0,0,0,0)";
	#running = false;
	#lastUpdate;
	#context;
	#animationId;

	constructor(canvas) {
		if (!(canvas instanceof HTMLCanvasElement)) {
			throw "Invalid HTML canvas.";
		}

		this.#context = canvas.getContext('2d');
	}

	pause() {
		if (!this.#running) {
			return;
		}

		this.#running = false;
		cancelAnimationFrame(this.#animationId);
	}

	run() {
		if (this.#running) {
			return;
		}

		this.#running = true;
		this.#aniamtionFrame();
	}

	setWindDirection(w) {
		this.#wind = w;
	}

	setSkyColor(c) {
		this.#sky = c;
	}

	add(x, y, w, h, circles, color, speed) {
		const cloud = createCloud(x, y, w, h, circles, color, speed);

		this.#clouds.push(cloud);
	}

	draw() {
		const w = this.#context.canvas.width,
			h = this.#context.canvas.height;

		this.#context.clearRect(0, 0, w, h);
		this.#context.fillStyle = this.#sky;
		this.#context.fillRect(0, 0, w, h);

		this.#clouds.forEach(cloud => drawCloud(cloud, this.#context));
	}

	#animate(timestamp) {
		const elapsed = timestamp - this.#lastUpdate;

		if (this.#lastUpdate !== undefined && elapsed < 250) {
			this.#update(elapsed);
			this.draw();
		}

		this.#lastUpdate = timestamp;
		this.#aniamtionFrame();
	}

	#aniamtionFrame() {
		this.#animationId = requestAnimationFrame((t) => this.#animate(t));
	}

	#update(elapsed) {
		this.#clouds.forEach(cloud => {
			const
				context = this.#context,
				wind = this.#wind,
				delta = cloud.speed * elapsed / 1000,
				dx = Math.cos(wind) * delta,
				dy = Math.sin(wind) * delta,
				halfW = cloud.w,
				halfH = cloud.h,
				w = context.canvas.width,
				h = context.canvas.height;

			cloud.x += dx;
			if (dx > 0 && cloud.x - halfW > w) {
				cloud.x = 0 - halfW;
			} else if (dx < 0 && cloud.x + halfW < 0) {
				cloud.x = w + halfW;
			}
			cloud.y += dy;
			if (dy > 0 && cloud.y - halfH > h) {
				cloud.y = 0 - halfH;
			} else if (dy < 0 && cloud.y + halfH < 0) {
				cloud.y = h + halfH;
			}
		});
	}
}