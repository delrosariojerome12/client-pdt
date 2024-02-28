import {useEffect} from "react";
import {DeviceEventEmitter} from "react-native";
import DataWedgeIntents from "react-native-datawedge-intents";

export const useBarcodeScanner = () => {
  const handleScanButtonPress = () => {
    // Initiates the scan when the button is pressed
    DataWedgeIntents.sendIntent(
      DataWedgeIntents.ACTION_SOFTSCANTRIGGER,
      DataWedgeIntents.START_SCANNING
    ).catch((error: any) => {
      console.error("Failed to initiate scan:", error);
    });
  };

  useEffect(() => {
    // Define the action for DataWedge Intents
    const action = "com.zebra.dwintents.ACTION";

    // Register a receiver for the barcode scans with the appropriate action
    DataWedgeIntents.registerReceiver(action, "");

    // Declare a handler for barcode scans
    const scanHandler = (deviceEvent: any) => {
      const barcodeValue = deviceEvent.data; // Assuming 'data' contains the barcode value
      console.log("Scanned barcode:", barcodeValue);
      // Perform further actions with the barcode value here
    };

    // Listen for scan events sent from the module
    DeviceEventEmitter.addListener("barcode_scan", scanHandler);

    // Cleanup function
    return () => {
      // Remove the listener and unregister receiver to prevent memory leaks
      DeviceEventEmitter.removeAllListeners("barcode_scan");
      DataWedgeIntents.unregisterReceiver();
    };
  }, [handleScanButtonPress]);

  return {handleScanButtonPress};
};
