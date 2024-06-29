// src/hooks/useCreateAttestation.js

import { useState } from "react";
import {  SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useEAS } from "../utils/hooks/useEAS";

export function useCreateAttestation() {
    const { eas,  currentAddress } = useEAS();
    const [attestationUID, setAttestationUID] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createAttestation = async (rate, comment, recommend) => {
        setLoading(true);
        setError(null);
        try {
            const schemaUID = "0x07ed7e30b56c3f405b347b5944693e1b1cee952e32f84a8b3479b70a5bfce5ac";
            
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder("uint8 Rate,string Comment,bool Recommend");

            // Encode data using parameters
            const encodedData = schemaEncoder.encodeData([
                { name: "Rate", value: rate.toString(), type: "uint8" },
                { name: "Comment", value: comment, type: "string" },
                { name: "Recommend", value: recommend, type: "bool" }
            ]);

            // Create attestation
            const tx = await eas.attest({
                schema: schemaUID,
                data: {
                    recipient: currentAddress, // Use current address or replace with desired recipient
                    expirationTime: 0,
                    revocable: true,
                    data: encodedData,
                },
            });

            // Wait for transaction confirmation
            const newAttestationUID = await tx.wait();
            setAttestationUID(newAttestationUID);
            // console.log("New attestation UID:", newAttestationUID);
        } catch (err) {
            setError(err);
            console.error("Error creating attestation:", err);
        } finally {
            setLoading(false);
        }
    };

    return { createAttestation, attestationUID, loading, error };
}

