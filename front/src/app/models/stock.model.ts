export interface Stock {
  id: number; // Example property: unique identifier
  name: string; // Example property: name of the stock
  quantity: number; // Example property: quantity of the stock
  userid:number;
  // Add more properties as needed, such as price, description, etc.

  // stock.model.ts

  // Add properties for editing state and edited values
  editing?: boolean; // Optional boolean to track editing state
  editedQuantity?: number; // Optional number to store edited quantity

}
