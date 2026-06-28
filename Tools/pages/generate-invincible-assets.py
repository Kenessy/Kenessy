from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "docs" / "assets" / "img" / "invincible"
SIZE = (1536, 864)
RNG = random.Random(731040)


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def gradient(top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    width, height = SIZE
    img = Image.new("RGB", SIZE)
    draw = ImageDraw.Draw(img)
    for y in range(height):
        t = y / max(1, height - 1)
        color = tuple(lerp(top[i], bottom[i], t) for i in range(3))
        draw.line([(0, y), (width, y)], fill=color)
    return img.convert("RGBA")


def add_noise(img: Image.Image, alpha: int = 20) -> None:
    width, height = img.size
    noise = Image.new("RGBA", img.size, (0, 0, 0, 0))
    px = noise.load()
    for y in range(0, height, 3):
        for x in range(0, width, 3):
            value = RNG.randint(-22, 28)
            if value >= 0:
                color = (255, 219, 150, min(alpha, value))
            else:
                color = (0, 0, 0, min(alpha, -value))
            px[x, y] = color
    img.alpha_composite(noise.filter(ImageFilter.GaussianBlur(1.2)))


def ellipse(draw: ImageDraw.ImageDraw, box, fill, outline=None, width=1):
    draw.ellipse(box, fill=fill, outline=outline, width=width)


def polygon(draw: ImageDraw.ImageDraw, points, fill, outline=None):
    draw.polygon(points, fill=fill, outline=outline)


def line(draw: ImageDraw.ImageDraw, points, fill, width=3):
    draw.line(points, fill=fill, width=width, joint="curve")


def terrain(draw: ImageDraw.ImageDraw, horizon: int = 440) -> None:
    width, height = SIZE
    far = [(0, horizon + 60), (190, horizon + 10), (380, horizon + 34), (620, horizon - 24), (850, horizon + 16), (1080, horizon - 18), (1360, horizon + 40), (width, horizon + 8), (width, height), (0, height)]
    polygon(draw, far, (82, 38, 24, 255))
    mid = [(0, horizon + 135), (210, horizon + 85), (450, horizon + 120), (700, horizon + 66), (950, horizon + 112), (1230, horizon + 76), (width, horizon + 140), (width, height), (0, height)]
    polygon(draw, mid, (127, 54, 29, 255))
    near = [(0, height), (0, horizon + 230), (260, horizon + 178), (590, horizon + 225), (920, horizon + 166), (1240, horizon + 210), (width, horizon + 174), (width, height)]
    polygon(draw, near, (170, 73, 34, 255))
    for _ in range(140):
        x = RNG.randint(0, width)
        y = RNG.randint(horizon + 95, height - 8)
        length = RNG.randint(18, 110)
        shade = RNG.choice([(210, 122, 58, 62), (66, 33, 22, 86), (238, 157, 79, 45)])
        line(draw, [(x, y), (min(width, x + length), y + RNG.randint(-5, 4))], shade, RNG.randint(1, 3))


def sun_and_sky(draw: ImageDraw.ImageDraw, sun_pos=(1220, 190), sun_r=58) -> None:
    ellipse(draw, (sun_pos[0] - sun_r, sun_pos[1] - sun_r, sun_pos[0] + sun_r, sun_pos[1] + sun_r), (240, 190, 115, 150))
    for r, a in [(160, 22), (250, 14), (360, 8)]:
        ellipse(draw, (sun_pos[0] - r, sun_pos[1] - r, sun_pos[0] + r, sun_pos[1] + r), (255, 178, 87, a))


def explorer(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float = 1.0, facing: int = 1) -> None:
    s = scale
    # Shadow
    ellipse(draw, (x - int(34 * s), y + int(70 * s), x + int(50 * s), y + int(86 * s)), (22, 12, 8, 100))
    # Legs
    line(draw, [(x - int(10 * s), y + int(42 * s)), (x - int(22 * s), y + int(78 * s))], (178, 91, 38, 255), int(10 * s))
    line(draw, [(x + int(14 * s), y + int(42 * s)), (x + int(30 * s), y + int(78 * s))], (188, 94, 38, 255), int(10 * s))
    # Body and backpack
    polygon(draw, [(x - int(26 * s), y - int(10 * s)), (x + int(32 * s), y - int(10 * s)), (x + int(42 * s), y + int(48 * s)), (x - int(34 * s), y + int(48 * s))], (203, 93, 38, 255), (255, 199, 116, 120))
    polygon(draw, [(x - int(40 * s), y - int(2 * s)), (x - int(62 * s), y + int(12 * s)), (x - int(52 * s), y + int(54 * s)), (x - int(35 * s), y + int(44 * s))], (82, 67, 54, 255))
    # Arms
    line(draw, [(x - int(28 * s), y + int(3 * s)), (x - int(58 * s), y + int(38 * s))], (210, 102, 41, 255), int(10 * s))
    line(draw, [(x + int(30 * s), y + int(2 * s)), (x + facing * int(70 * s), y + int(30 * s))], (214, 106, 43, 255), int(10 * s))
    # Helmet
    ellipse(draw, (x - int(30 * s), y - int(60 * s), x + int(30 * s), y), (225, 169, 90, 255), (255, 232, 174, 160), max(1, int(3 * s)))
    ellipse(draw, (x - int(18 * s), y - int(48 * s), x + int(25 * s), y - int(12 * s)), (38, 56, 58, 220))
    # Antenna
    line(draw, [(x - int(15 * s), y - int(58 * s)), (x - int(34 * s), y - int(93 * s))], (238, 208, 136, 210), max(1, int(2 * s)))
    ellipse(draw, (x - int(40 * s), y - int(100 * s), x - int(30 * s), y - int(90 * s)), (97, 217, 198, 210))


def rover(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float = 1.0) -> None:
    s = scale
    polygon(draw, [(x - int(95*s), y), (x + int(70*s), y - int(18*s)), (x + int(118*s), y + int(28*s)), (x - int(75*s), y + int(38*s))], (121, 87, 62, 255), (230, 171, 91, 130))
    ellipse(draw, (x - int(92*s), y + int(20*s), x - int(48*s), y + int(64*s)), (22, 18, 15, 255), (210, 170, 110, 100), max(1, int(3*s)))
    ellipse(draw, (x + int(38*s), y + int(15*s), x + int(92*s), y + int(69*s)), (22, 18, 15, 255), (210, 170, 110, 100), max(1, int(3*s)))
    polygon(draw, [(x - int(20*s), y - int(42*s)), (x + int(50*s), y - int(50*s)), (x + int(68*s), y - int(15*s)), (x - int(33*s), y - int(2*s))], (87, 69, 55, 255), (229, 173, 98, 110))
    line(draw, [(x + int(35*s), y - int(50*s)), (x + int(55*s), y - int(96*s))], (214, 181, 112, 200), max(1, int(3*s)))
    ellipse(draw, (x + int(47*s), y - int(104*s), x + int(63*s), y - int(88*s)), (97, 217, 198, 160))


def instrument(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float = 1.0) -> None:
    s = scale
    ellipse(draw, (x - int(44*s), y - int(44*s), x + int(44*s), y + int(44*s)), (46, 39, 32, 255), (229, 185, 105, 150), max(1, int(4*s)))
    ellipse(draw, (x - int(24*s), y - int(24*s), x + int(24*s), y + int(24*s)), (97, 217, 198, 58), (97, 217, 198, 160), max(1, int(2*s)))
    line(draw, [(x, y), (x + int(34*s), y - int(14*s))], (255, 179, 71, 220), max(1, int(3*s)))
    line(draw, [(x - int(70*s), y + int(48*s)), (x + int(84*s), y + int(72*s))], (40, 28, 20, 160), max(1, int(5*s)))


def swarm(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float = 1.0) -> None:
    s = scale
    for i in range(750):
        angle = RNG.random() * math.tau
        radius = (RNG.random() ** 0.62) * 210 * s
        px = x + int(math.cos(angle) * radius * 1.65)
        py = y + int(math.sin(angle) * radius * 0.62)
        size = max(1, int(RNG.randint(2, 7) * s))
        alpha = RNG.randint(80, 210)
        ellipse(draw, (px - size, py - size, px + size, py + size), (12, 15, 14, alpha))
    for i in range(60):
        px = x + RNG.randint(-330, 330)
        py = y + RNG.randint(-95, 105)
        line(draw, [(px, py), (px + RNG.randint(18, 70), py + RNG.randint(-10, 10))], (26, 35, 32, 120), RNG.randint(1, 3))


def machine_ruins(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float = 1.0) -> None:
    s = scale
    for i in range(4):
        bx = x + int((i - 1.5) * 95 * s)
        by = y + int(RNG.randint(-16, 20) * s)
        ellipse(draw, (bx - int(45*s), by - int(28*s), bx + int(45*s), by + int(28*s)), (58, 49, 43, 255), (180, 142, 91, 120), max(1, int(3*s)))
        line(draw, [(bx - int(25*s), by + int(24*s)), (bx - int(55*s), by + int(78*s))], (45, 37, 31, 240), max(1, int(5*s)))
        line(draw, [(bx + int(18*s), by + int(24*s)), (bx + int(55*s), by + int(78*s))], (45, 37, 31, 240), max(1, int(5*s)))
    line(draw, [(x + int(120*s), y - int(65*s)), (x + int(180*s), y - int(210*s))], (91, 72, 53, 220), max(1, int(5*s)))
    ellipse(draw, (x + int(164*s), y - int(226*s), x + int(196*s), y - int(194*s)), (97, 217, 198, 120))


def base_scene(sun=(1200, 170), horizon=420) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = gradient((44, 54, 57), (105, 50, 28))
    overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    sun_and_sky(draw, sun)
    terrain(draw, horizon)
    add_noise(overlay)
    img.alpha_composite(overlay)
    return img, ImageDraw.Draw(img)


def vignette(img: Image.Image) -> Image.Image:
    width, height = img.size
    mask = Image.new("L", img.size, 0)
    px = mask.load()
    cx = width / 2
    cy = height / 2
    max_dist = math.sqrt(cx * cx + cy * cy)
    for y in range(height):
        for x in range(width):
            dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / max_dist
            px[x, y] = int(255 * max(0, dist - 0.34) ** 1.7)
    dark = Image.new("RGBA", img.size, (0, 0, 0, 120))
    shaded = Image.composite(dark, Image.new("RGBA", img.size, (0, 0, 0, 0)), mask)
    img.alpha_composite(shaded)
    return img.convert("RGB")


def save(name: str, img: Image.Image) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    img = vignette(img)
    img.save(OUT / name, "PNG", optimize=True)
    print(f"wrote {OUT / name}")


def hero():
    img, draw = base_scene(sun=(1180, 155), horizon=392)
    rover(draw, 1060, 585, 1.45)
    rover(draw, 1260, 545, 0.75)
    instrument(draw, 510, 610, 0.85)
    explorer(draw, 405, 585, 1.22)
    line(draw, [(470, 625), (800, 700), (1120, 610)], (41, 29, 21, 120), 8)
    return img


def wake():
    img, draw = base_scene(sun=(1090, 175), horizon=430)
    instrument(draw, 630, 615, 1.0)
    explorer(draw, 480, 650, 1.05)
    line(draw, [(545, 710), (700, 745), (890, 760)], (38, 26, 20, 110), 6)
    for x in [740, 785, 830, 880]:
        ellipse(draw, (x, 720 + RNG.randint(-7, 7), x + 22, 733 + RNG.randint(-7, 7)), (50, 27, 20, 105))
    return img


def instruments():
    img, draw = base_scene(sun=(1260, 160), horizon=410)
    rover(draw, 1050, 548, 0.75)
    instrument(draw, 360, 635, 1.25)
    explorer(draw, 610, 585, 0.92, facing=-1)
    for x in range(420, 1010, 45):
        y = 660 + int(math.sin(x / 80) * 28)
        ellipse(draw, (x, y, x + 18, y + 10), (43, 28, 21, 130))
    line(draw, [(405, 675), (520, 690), (680, 665), (920, 610)], (40, 30, 24, 135), 6)
    return img


def locator_map():
    img, draw = base_scene(sun=(1230, 150), horizon=410)
    rover(draw, 1030, 560, 0.72)
    explorer(draw, 450, 610, 0.86)
    instrument(draw, 335, 660, 1.05)

    # Diegetic map plate: abstract route colors, no readable labels.
    polygon(draw, [(650, 458), (1125, 400), (1210, 672), (720, 744)], (37, 43, 41, 230), (238, 196, 116, 135))
    for i, color in enumerate([(97, 217, 198, 145), (255, 179, 71, 145), (164, 135, 255, 115)]):
        pts = []
        for step in range(7):
            px = 700 + step * 70
            py = 650 - i * 44 + int(math.sin(step * 1.5 + i) * 32)
            pts.append((px, py))
        line(draw, pts, color, 6 - i)
    for px, py, r in [(760, 620, 15), (920, 540, 20), (1060, 610, 13), (830, 690, 10)]:
        ellipse(draw, (px - r, py - r, px + r, py + r), (255, 179, 71, 58), (255, 216, 143, 165), 3)
    for x in range(690, 1180, 62):
        line(draw, [(x, 425), (x - 18, 724)], (244, 234, 208, 25), 1)
    for y in range(450, 720, 48):
        line(draw, [(680, y), (1188, y - 50)], (244, 234, 208, 22), 1)
    return img


def sandstorm_ringed_moon():
    img = gradient((53, 54, 58), (133, 63, 31))
    overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    sun_and_sky(draw, (1185, 165), 42)
    ellipse(draw, (300, 92, 420, 212), (210, 184, 132, 130))
    for w, a in [(250, 48), (310, 34), (380, 22)]:
        draw.arc((360 - w, 118 - w // 7, 360 + w, 188 + w // 7), 8, 172, fill=(230, 204, 145, a), width=5)
    terrain(draw, 430)
    for i in range(120):
        x = RNG.randint(-100, 1500)
        y = RNG.randint(270, 760)
        line(draw, [(x, y), (x + RNG.randint(160, 460), y - RNG.randint(6, 42))], (219, 137, 72, RNG.randint(34, 86)), RNG.randint(2, 8))
    explorer(draw, 460, 650, 0.78)
    for tx, ty in [(990, 545), (1080, 530), (1175, 552)]:
        polygon(draw, [(tx - 38, ty + 54), (tx, ty - 8), (tx + 42, ty + 54)], (102, 68, 43, 190), (234, 177, 94, 70))
    add_noise(overlay, 28)
    img.alpha_composite(overlay)
    return img


def convoy():
    img, draw = base_scene(sun=(1160, 150), horizon=400)
    rover(draw, 720, 590, 1.35)
    rover(draw, 965, 535, 0.90)
    rover(draw, 1190, 510, 0.62)
    explorer(draw, 355, 660, 0.86)
    line(draw, [(470, 710), (690, 650), (980, 595), (1270, 550)], (53, 32, 23, 135), 11)
    line(draw, [(455, 755), (700, 690), (1010, 635), (1325, 592)], (220, 128, 62, 58), 6)
    return img


def ruins():
    img, draw = base_scene(sun=(1145, 135), horizon=410)
    machine_ruins(draw, 850, 570, 1.18)
    explorer(draw, 430, 630, 0.92)
    line(draw, [(500, 600), (760, 510)], (255, 210, 130, 62), 14)
    line(draw, [(505, 604), (785, 518)], (255, 232, 166, 95), 4)
    return img


def camp_krauta():
    img, draw = base_scene(sun=(1160, 150), horizon=405)
    for tx, ty, sc in [(830, 548, 1.15), (1040, 575, 0.86), (1210, 535, 0.62)]:
        polygon(draw, [(tx - int(90*sc), ty + int(65*sc)), (tx, ty - int(44*sc)), (tx + int(110*sc), ty + int(65*sc))], (96, 67, 48, 230), (232, 172, 91, 120))
        line(draw, [(tx, ty - int(42*sc)), (tx, ty + int(65*sc))], (230, 186, 106, 80), max(1, int(3*sc)))
    machine_ruins(draw, 600, 585, 0.72)
    explorer(draw, 390, 640, 0.85)
    # Dr. Krauta as a quiet medical silhouette under a tarp, kept abstract.
    ellipse(draw, (930, 650, 1088, 692), (27, 23, 20, 170), (238, 190, 112, 80), 3)
    polygon(draw, [(915, 670), (1045, 642), (1130, 676), (1002, 720)], (82, 68, 54, 215), (219, 178, 106, 70))
    line(draw, [(500, 642), (660, 630), (930, 675)], (42, 32, 25, 150), 7)
    for px, py in [(735, 604), (755, 620), (775, 636), (795, 653)]:
        ellipse(draw, (px - 4, py - 4, px + 4, py + 4), (97, 217, 198, 150))
    return img


def aquarium_probe():
    img = gradient((23, 31, 32), (87, 43, 29))
    overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    polygon(draw, [(0, 620), (1536, 570), (1536, 864), (0, 864)], (72, 42, 27, 255))
    polygon(draw, [(235, 230), (1225, 190), (1310, 675), (160, 735)], (37, 74, 75, 210), (171, 226, 210, 120))
    polygon(draw, [(270, 280), (1170, 240), (1230, 635), (225, 690)], (46, 108, 104, 125))
    for i in range(11):
        fx = RNG.randint(360, 1080)
        fy = RNG.randint(360, 590)
        body = RNG.randint(22, 42)
        ellipse(draw, (fx - body, fy - body // 2, fx + body, fy + body // 2), (180, 126, 71, 150), (235, 197, 124, 100), 2)
        polygon(draw, [(fx + body, fy), (fx + body + 28, fy - 13), (fx + body + 24, fy + 14)], (177, 113, 66, 130))
    for px, py in [(530, 340), (705, 320), (888, 355)]:
        ellipse(draw, (px - 22, py - 22, px + 22, py + 22), (40, 45, 44, 220), (97, 217, 198, 110), 3)
        line(draw, [(px + 20, py), (px + 74, py + 24)], (97, 217, 198, 90), 3)
    explorer(draw, 1330, 660, 0.72, facing=-1)
    for x in range(260, 1240, 70):
        line(draw, [(x, 260), (x + 54, 650)], (244, 234, 208, 16), 1)
    add_noise(overlay, 22)
    img.alpha_composite(overlay)
    return img


def metal_cloud():
    img, draw = base_scene(sun=(1090, 140), horizon=420)
    swarm(draw, 940, 250, 1.15)
    explorer(draw, 435, 635, 0.82)
    polygon(draw, [(310, 735), (405, 610), (505, 725)], (70, 33, 24, 255))
    line(draw, [(490, 570), (590, 500)], (97, 217, 198, 110), 5)
    return img


def relay_repair():
    img, draw = base_scene(sun=(1210, 215), horizon=418)
    explorer(draw, 555, 625, 0.88)
    machine_ruins(draw, 1040, 625, 0.56)
    line(draw, [(740, 640), (790, 385)], (215, 178, 105, 230), 8)
    line(draw, [(790, 385), (730, 450)], (215, 178, 105, 190), 5)
    line(draw, [(790, 385), (872, 462)], (215, 178, 105, 190), 5)
    ellipse(draw, (846, 424, 950, 520), (63, 54, 44, 210), (232, 182, 93, 110), 5)
    line(draw, [(620, 650), (720, 630), (850, 466)], (42, 32, 25, 160), 7)
    for r, a in [(46, 80), (92, 52), (150, 30)]:
        ellipse(draw, (790 - r, 385 - r, 790 + r, 385 + r), (97, 217, 198, a))
    rover(draw, 1195, 585, 0.65)
    return img


def signal():
    img, draw = base_scene(sun=(1225, 250), horizon=430)
    rover(draw, 1040, 600, 1.0)
    explorer(draw, 620, 620, 0.88)
    line(draw, [(760, 610), (840, 355)], (208, 174, 107, 230), 8)
    line(draw, [(840, 355), (780, 420)], (208, 174, 107, 190), 4)
    line(draw, [(840, 355), (910, 430)], (208, 174, 107, 190), 4)
    for r, a in [(44, 80), (90, 50), (142, 28)]:
        ellipse(draw, (840 - r, 355 - r, 840 + r, 355 + r), (97, 217, 198, a))
    return img


def main() -> None:
    scenes = {
        "invincible-hero-regis.png": hero(),
        "invincible-page-01-wake-regis.png": wake(),
        "invincible-page-02-locator-map.png": locator_map(),
        "invincible-page-03-sandstorm-ringed-moon.png": sandstorm_ringed_moon(),
        "invincible-page-04-camp-krauta.png": camp_krauta(),
        "invincible-page-05-aquarium-probe-fear.png": aquarium_probe(),
        "invincible-page-06-relay-repair.png": relay_repair(),
    }
    OUT.mkdir(parents=True, exist_ok=True)
    for stale in OUT.glob("invincible-*.png"):
        if stale.name not in scenes:
            stale.unlink()
            print(f"removed stale {stale}")
    for name, img in scenes.items():
        save(name, img)


if __name__ == "__main__":
    main()
