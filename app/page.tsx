"use client"

import { useState } from "react"
import Image from "next/image"

// Gallery item type
type GalleryItem = {
  id: number
  type: "image" | "video"
  src: string
  alt: string
  aspectRatio: "square" | "portrait" | "landscape" | "wide"
}

export default function Home() {

  const [selectedFilter, setSelectedFilter] = useState<"all" | "images" | "videos">("all")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  // Filter gallery items based on selection
  // const filteredItems = galleryItems.filter((item) => {
  //   if (selectedFilter === "all") return true
  //   if (selectedFilter === "images") return item.type === "image"
  //   if (selectedFilter === "videos") return item.type === "video"
  //   return true
  // })

  // Function to get appropriate classes based on aspect ratio
  // const getAspectRatioClasses = (aspectRatio: string) => {
  //   switch (aspectRatio) {
  //     case "square":
  //       return "aspect-square"
  //     case "portrait":
  //       return "aspect-[3/4]"
  //     case "landscape":
  //       return "aspect-[4/3]"
  //     case "wide":
  //       return "aspect-[16/9]"
  //     default:
  //       return "aspect-square"
  //   }
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">KIIT B.Tech 2025 Gallery</h1>
          <p className="text-center mt-2 text-gray-200">Memories of our engineering journey</p>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-md ${selectedFilter === "all" ? "bg-[#003366] text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter("images")}
            className={`px-4 py-2 rounded-md ${selectedFilter === "images" ? "bg-[#003366] text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            Photos
          </button>
          <button
            onClick={() => setSelectedFilter("videos")}
            className={`px-4 py-2 rounded-md ${selectedFilter === "videos" ? "bg-[#003366] text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            Videos
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {Array.from({ length: 105 }).map((_, i) => {
            const index = i + 261;
            return (
              <div
                key={index}
                className="bg-slate-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <Image
                    src={`https://ik.imagekit.io/jiban/btech25images/DSC_0${index}.JPG`}
                    alt={`image-${index}`}
                    className="object-cover"
                    width={981}
                    height={600}
                  />
                </div>
              </div>
            );
          })}


        </div>
      </div>

      {/* Modal for viewing selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center text-black hover:bg-gray-200"
            >
              ✕
            </button>

            {selectedItem.type === "image" ? (
              <div className="relative w-full h-full max-h-[80vh]">
                <Image
                  src={selectedItem.src || "/placeholder.svg"}
                  alt={selectedItem.alt}
                  width={1200}
                  height={800}
                  className="object-contain mx-auto max-h-[80vh] w-auto"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video">
                <video src={selectedItem.src} controls autoPlay className="w-full h-full" />
              </div>
            )}

            <div className="bg-white p-4 mt-2">
              <p className="text-lg font-medium">{selectedItem.alt}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 KIIT B.Tech Batch | Class of 2025</p>
          <p className="mt-2 text-sm text-gray-300">Kalinga Institute of Industrial Technology, Bhubaneswar</p>
        </div>
      </footer>
    </div>
  )
}
