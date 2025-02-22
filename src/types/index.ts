//Transfer
export const transportTypes = {
   METRO: 'Metro (Tren, Subway, Subterráneo)',
   AUTO: 'Auto (Gasolina)',
   CAMIONETA: 'Camioneta (Diesel)',
   MOTOCICLETA: 'Motocicleta (Gasolina)',
   BUS_TRANSANTIAGO: 'Bus Transantiago (Transporte público)',
   BUS: 'Bus (Vehículo privado)',
   AVION_NACIONAL: 'Avión (Nacional)',
   AVION_INTERNACIONAL: 'Avión (Internacional)',
} as const;

export type TransportType = (typeof transportTypes)[keyof typeof transportTypes];
