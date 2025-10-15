import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import imageio
import os

triangle = np.array([[0,0],[1,0],[0.5,1],[0,0]])

def to_homogeneous(pts):
    return np.hstack((pts[:-1], np.ones((pts.shape[0]-1,1))))

def from_homogeneous(h):
    return np.vstack((h[:,:2], h[0,:2]))

triangle_h = to_homogeneous(triangle)

def transform_matrix(translate=(0,0), angle_deg=0, scale=(1,1)):
    angle = np.radians(angle_deg)
    tx, ty = translate
    sx, sy = scale
    T = np.array([[1,0,tx],[0,1,ty],[0,0,1]])
    R = np.array([[np.cos(angle), -np.sin(angle), 0],
                  [np.sin(angle),  np.cos(angle), 0],
                  [0,0,1]])
    S = np.array([[sx,0,0],[0,sy,0],[0,0,1]])
    return S @ R @ T

frames_dir = "frames_tmp"
if os.path.exists(frames_dir):
    import shutil
    shutil.rmtree(frames_dir)
os.makedirs(frames_dir, exist_ok=True)
filenames = []
n_frames = 40
# fixed figure size and dpi -> fixed pixel dimensions
fig_w, fig_h = 400, 400
dpi = 100
for i in range(n_frames):
    t = i / n_frames
    tx = 0.5 * np.sin(2*np.pi*t)
    ty = 0.3 * np.cos(2*np.pi*t)
    angle = 360 * t
    sx = 1 + 0.5 * np.sin(2*np.pi*t)
    sy = 1 + 0.3 * np.cos(2*np.pi*t)
    M = transform_matrix(translate=(tx,ty), angle_deg=angle, scale=(sx,sy))
    transformed = (M @ triangle_h.T).T
    transformed_cart = from_homogeneous(transformed)
    
    fig = plt.figure(figsize=(fig_w/dpi, fig_h/dpi), dpi=dpi)
    ax = fig.add_subplot(111)
    ax.plot(triangle[:,0], triangle[:,1], '-o', label='Original', linewidth=2)
    ax.plot(transformed_cart[:,0], transformed_cart[:,1], '-o', label='Transformed', linewidth=2)
    ax.set_aspect('equal')
    ax.set_xlim(-2, 3)
    ax.set_ylim(-2, 3)
    ax.axis('off')
    ax.legend(loc='upper right')
    fname = os.path.join(frames_dir, f"frame_{i:03d}.png")
    fig.savefig(fname, bbox_inches='tight', pad_inches=0.05)
    plt.close(fig)
    filenames.append(fname)

# Use imageio.get_writer to write frames and handle any minor differences
gif_path = os.path.join("..","resultados","transformaciones_demo.gif")
with imageio.get_writer(gif_path, mode='I', duration=0.08) as writer:
    for filename in filenames:
        image = imageio.imread(filename)
        writer.append_data(image)

# cleanup
for f in filenames:
    try:
        os.remove(f)
    except:
        pass
try:
    os.rmdir(frames_dir)
except:
    pass

print("GIF creado en:", os.path.abspath(gif_path))
