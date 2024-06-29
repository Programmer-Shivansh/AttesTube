import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
// import { EAS_ADDRESS, SCHEMA_REGISTRY_ADDRESS } from "../config/config";

export const useEAS = () => {
  const [eas, setEAS] = useState();
  const [schemaRegistry, setSchemaRegistry] = useState();
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    if (currentAddress) return;

    const init = async () => {
      // Initialize the sdk with the address of the EAS Schema contract address
      const EAS_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
      const SCHEMA_REGISTRY_ADDRESS = "0x07ed7e30b56c3f405b347b5944693e1b1cee952e32f84a8b3479b70a5bfce5ac";
      const easInstance = new EAS(EAS_ADDRESS);
      const schemaRegistryInstance = new SchemaRegistry(SCHEMA_REGISTRY_ADDRESS);

      // Gets a default provider (in production use something else like infura/alchemy)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Connects an ethers style provider/signingProvider to perform read/write functions.
      easInstance.connect(signer); // allow clients to attest against freelancer's schema
      schemaRegistryInstance.connect(signer); // allow Freelancer to register their own reputation schema
      setEAS(easInstance);
      setSchemaRegistry(schemaRegistryInstance);
      setCurrentAddress(address);
    };

    init();
  }, [currentAddress]);

  return { eas, schemaRegistry, currentAddress };
};
