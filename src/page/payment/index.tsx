import { CheckoutData } from "@/model/ticket";

type PaymentProps = {
  isOpen: boolean;
  item: CheckoutData;
  onClose: () => void;
};

export default function Payment({ isOpen, item, onClose }: PaymentProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-black py-3 font-semibold text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
