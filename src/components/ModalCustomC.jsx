import React from "react";

const ModalCustomC = ({ open, onClose, title, children }) => {
  if (!open) return null; // 닫혀있으면 아무것도 렌더X

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경(오버레이) */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 모달 카드 */}
      <div className="relative w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200"
          >
            닫기
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default ModalCustomC;
