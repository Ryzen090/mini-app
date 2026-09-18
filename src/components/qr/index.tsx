"use client";

import { useEffect, useState } from "react";

import QRCode from "qrcode";
import MyImage from "../image";

export default function QR({ _id }: { _id?: string }) {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (!_id) {
      setQrCode("");
      return;
    }

    QRCode.toDataURL(_id, {
      width: 120,
      margin: 1,
      errorCorrectionLevel: "H",
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }).then(setQrCode);
  }, [_id]);

  if (!qrCode) return null;

  return (
    <MyImage
      src={qrCode}
      alt={`QR Code for ${_id}`}
      className="h-10 w-10 rounded bg-white sm:h-12 sm:w-12"
    />
  );
}
