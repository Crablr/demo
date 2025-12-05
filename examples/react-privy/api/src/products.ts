export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Record<string, IProduct> = {
  ["headset" as string]: {
    id: "headset",
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  ["smartwatch" as string]: {
    id: "smartwatch",
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life. Stay connected and healthy.",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
  ["keyboard" as string]: {
    id: "keyboard",
    name: "Mechanical Gaming Keyboard",
    description:
      "RGB backlit mechanical keyboard with customizable keys and tactile switches. Designed for gamers and typists who demand precision.",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
  ["mouse" as string]: {
    id: "mouse",
    name: "Wireless Ergonomic Mouse",
    description:
      "Comfortable wireless mouse with adjustable DPI, ergonomic design, and precision tracking. Ideal for extended work sessions.",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
  },
  ["webcam" as string]: {
    id: "webcam",
    name: "4K Pro Webcam",
    description:
      "Professional 4K webcam with autofocus, noise-canceling microphone, and low-light correction. Perfect for streaming and video calls.",
    price: 189.99,
    image:
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop",
  },
  ["speaker" as string]: {
    id: "speaker",
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360° sound, 20-hour battery life, and deep bass. Take your music anywhere.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
  },
};
