// src/scripts/cartStore.ts

export interface CartItem {
  id: string | number;
  name: string;
  variant: string;
  price: number;
  img: string;
  quantity: number;
}

class CartStore {
  items: CartItem[] = [];
  isOpen = false;
  listeners: Function[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.load();
      this.setupGlobalListeners();
    }
  }

  load() {
    const stored = localStorage.getItem('origami_cart');
    if (stored) {
      this.items = JSON.parse(stored);
    }
  }

  save() {
    localStorage.setItem('origami_cart', JSON.stringify(this.items));
    this.notify();
  }

  add(item: Omit<CartItem, 'quantity'>) {
    const existing = this.items.find(i => i.id === item.id && i.variant === item.variant);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.isOpen = true; // Abre automáticamente el carrito al añadir
    this.save();
  }

  remove(id: string | number, variant: string) {
    this.items = this.items.filter(i => !(i.id === id && i.variant === variant));
    this.save();
  }

  updateQuantity(id: string | number, variant: string, delta: number) {
    const existing = this.items.find(i => i.id === id && i.variant === variant);
    if (existing) {
      existing.quantity += delta;
      if (existing.quantity <= 0) {
        this.remove(id, variant);
      } else {
        this.save();
      }
    }
  }

  toggleDrawer(forceState?: boolean) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    this.notify();
  }

  subscribe(listener: Function) {
    this.listeners.push(listener);
    listener(this); // Llamada inicial para setear el estado
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  private setupGlobalListeners() {
    // Escuchamos el evento que ya tenías en Showcase.astro
    document.addEventListener('cart:add', (e: any) => {
      if (e.detail) {
        this.add(e.detail);
      }
    });
  }
}

export const cartStore = new CartStore();