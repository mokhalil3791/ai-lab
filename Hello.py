import math

def draw_circle(radius=10, char='*'):
    for y in range(-radius, radius + 1):
        line = []
        for x in range(-radius, radius + 1):
            distance = math.hypot(x, y)
            line.append(char if abs(distance - radius) < 0.7 else ' ')
        print(''.join(line))


if __name__ == '__main__':
    draw_circle(10)

