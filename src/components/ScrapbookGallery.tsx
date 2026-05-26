/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Trash2, Heart, Sparkles } from "lucide-react";
import { PRESET_PHOTOS } from "../data";
import { PolaroidPhoto } from "../types";
import { sweetAudio } from "../audio";

interface ScrapbookGalleryProps {
  onClose: () => void;
}

const PRESET_MOCK_LINKS = [
  "D:\\birthday\\src\\IMG_0192.jpg",
  "D:\\birthday\\src\\IMG_0193.jpg",
  "D:\\birthday\\src\\IMG_0194.jpg",
  "D:\\birthday\\src\\IMG_0195.JPG"
];

export default function ScrapbookGallery({ onClose }: ScrapbookGalleryProps) {
  const [photos, setPhotos] = useState<PolaroidPhoto[]>(PRESET_PHOTOS);
  const [caption, setCaption] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [diaryNote, setDiaryNote] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  const handleCreatePolaroid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    sweetAudio.playChime();

    const finalUrl =
      photoUrl.trim() ||
      PRESET_MOCK_LINKS[Math.floor(Math.random() * PRESET_MOCK_LINKS.length)];

    const newPhoto: PolaroidPhoto = {
      id: `photo-custom-${Date.now()}`,
      url: finalUrl,
      caption: caption,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rotation: Math.random() * 12 - 6,
      note:
        diaryNote.trim() ||
        "Another memory worth keeping.",
      isCustom: true,
    };

    setPhotos([newPhoto, ...photos]);
    setCaption("");
    setPhotoUrl("");
    setDiaryNote("");
    setShowAddForm(false);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sweetAudio.playClick();
    const filtered = photos.filter((p) => p.id !== id);
    setPhotos(filtered);
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  const handleReset = () => {
    sweetAudio.playClick();
    if (confirm("Reset scrapbook to our original memories?")) {
      setPhotos(PRESET_PHOTOS);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-2 sm:p-4">

      {/* Top action row */}
      <div className="flex gap-3 justify-center mb-8 w-full">
        <button
          onClick={() => {
            sweetAudio.playClick();
            setShowAddForm(!showAddForm);
          }}
          className="px-5 py-2.5 bg-pink-100 border border-pink-200 text-pink-600 rounded-full font-quicksand font-bold text-xs flex items-center gap-1.5 hover:bg-pink-200 transition cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>{showAddForm ? "View Album" : "Add a Memory"}</span>
        </button>

        {photos.length !== PRESET_PHOTOS.length && (
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-slate-200 text-slate-500 rounded-full font-quicksand font-medium text-xs hover:bg-slate-50 transition cursor-pointer"
          >
            Reset to Ours
          </button>
        )}
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleCreatePolaroid}
            className="w-full max-w-md bg-white/70 backdrop-blur-md border border-pink-200 rounded-2xl p-5 mb-8 shadow-md flex flex-col gap-3 font-quicksand"
          >
            <h3 className="font-playfair text-pink-600 font-bold text-center text-lg flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Add a New Memory</span>
            </h3>

            <div>
              <label className="text-[11px] text-pink-500 font-bold block mb-1">
                Caption *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. That random evening drive..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 bg-white/70 border border-pink-100 rounded-xl text-xs sm:text-sm text-slate-800 font-quicksand focus:outline-none focus:border-pink-300"
              />
            </div>

            <div>
              <label className="text-[11px] text-pink-500 font-bold block mb-1">
                Photo Path (Optional)
              </label>
              <input
                type="text"
                placeholder="D:\birthday\src\IMG_XXXX.jpg or leave empty"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white/70 border border-pink-100 rounded-xl text-xs sm:text-sm text-slate-800 font-quicksand focus:outline-none focus:border-pink-300"
              />
            </div>

            <div>
              <label className="text-[11px] text-pink-500 font-bold block mb-1">
                Note / Story
              </label>
              <textarea
                placeholder="What happened that day? Even a few words..."
                rows={3}
                value={diaryNote}
                onChange={(e) => setDiaryNote(e.target.value)}
                className="w-full px-3 py-2 bg-white/70 border border-pink-100 rounded-xl text-xs sm:text-sm text-slate-800 font-quicksand focus:outline-none focus:border-pink-300 resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-xs sm:text-sm rounded-xl hover:from-pink-500 hover:to-rose-500 shadow-sm cursor-pointer"
            >
              Add to Scrapbook ✨
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Scrapbook board */}
      <div className="w-full relative min-h-[500px] border-2 border-dashed border-pink-200 bg-white/20 backdrop-blur-xs rounded-3xl p-6 overflow-hidden flex flex-wrap gap-8 justify-around items-center select-none">

        <div className="absolute top-3 left-1/2 -translate-x-1/2 transform text-[10px] text-pink-500 font-quicksand font-bold bg-white/80 border border-pink-100/50 px-4 py-1 rounded-full text-center z-10 pointer-events-none shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>These polaroids are draggable!</span>
        </div>

        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.4}
            whileDrag={{ scale: 1.08, zIndex: 30, rotate: 0 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => {
              sweetAudio.playClick();
              setSelectedPhoto(photo);
            }}
            style={{ rotate: `${photo.rotation}deg` }}
            className="relative w-44 sm:w-48 bg-white border border-slate-100 rounded-lg p-3 pt-3 pb-5 shadow-lg shadow-pink-200/30 hover:shadow-2xl transition-shadow duration-300 cursor-grab active:cursor-grabbing flex flex-col items-center group"
          >
            {/* Tape strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/60 border border-yellow-200/25 opacity-75 backdrop-blur-xs rotate-3 shadow-sm flex items-center justify-center font-sans text-stone-500 text-[8px] tracking-widest font-semibold uppercase">
              🤍 MEMORY
            </div>

            {/* Photo */}
            <div className="w-full aspect-square bg-[#faf3ed] rounded border border-neutral-100 overflow-hidden relative">
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-pink-300/10 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center pointer-events-none">
                <Heart className="w-8 h-8 fill-pink-500 text-white animate-pulse" />
              </div>
            </div>

            {/* Caption + date */}
            <div className="w-full mt-3 flex flex-col items-center">
              <span className="font-caveat font-bold text-pink-700 text-base sm:text-lg text-center leading-tight truncate w-full">
                {photo.caption}
              </span>
              <span className="font-mono text-[9px] text-stone-400 mt-1 uppercase tracking-wider font-semibold">
                {photo.date}
              </span>
            </div>

            {/* Delete */}
            <button
              onClick={(e) => handleDeletePhoto(photo.id, e)}
              className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-rose-100/90 border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition shadow-sm cursor-pointer opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </motion.div>
        ))}

        {photos.length === 0 && (
          <div className="text-center py-12 flex flex-col items-center gap-2">
            <Camera className="w-10 h-10 text-pink-300" />
            <p className="font-quicksand text-sm text-pink-500/80 font-bold">
              No memories here yet.
            </p>
            <button
              onClick={() => setPhotos(PRESET_PHOTOS)}
              className="mt-2 text-xs text-pink-600 bg-white/70 px-4 py-1.5 rounded-full border border-pink-100 hover:bg-white font-bold cursor-pointer"
            >
              Load Our Photos
            </button>
          </div>
        )}
      </div>

      {/* Expanded polaroid modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-pink-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fefef9] border border-stone-200 rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl relative font-quicksand"
            >
              {/* Tape */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-28 h-8 bg-yellow-100 border border-yellow-200 rounded opacity-90 shadow-xs flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-[#a16207]">
                💝 FOREVER WE
              </div>

              {/* Image */}
              <div className="w-full aspect-[4/3] bg-amber-50/20 border border-neutral-100 rounded-lg overflow-hidden mt-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="mt-4 text-center">
                <h3 className="font-playfair font-bold text-pink-700 text-lg sm:text-xl flex items-center justify-center gap-1.5">
                  <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  <span>{selectedPhoto.caption}</span>
                </h3>
                <span className="font-mono text-[10px] text-slate-400 font-bold block mt-1">
                  {selectedPhoto.date}
                </span>

                <div className="border-t border-dashed border-[#ebe4ce] mt-4 pt-4 text-left font-caveat text-stone-700 text-xl sm:text-2xl leading-relaxed pl-1 max-h-40 overflow-y-auto">
                  "{selectedPhoto.note || "No note yet. But we both know what this day meant."}"
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-2 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs rounded-full shadow-md cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}