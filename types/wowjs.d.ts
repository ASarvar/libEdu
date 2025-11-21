declare module 'wowjs' {
  export class WOW {
    constructor(options?: { live?: boolean });
    init(): void;
  }
}

declare module 'wowjs/dist/wow' {
  export class WOW {
    constructor(options?: { live?: boolean });
    init(): void;
  }
}

