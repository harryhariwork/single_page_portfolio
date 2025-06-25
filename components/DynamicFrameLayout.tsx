"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import ProjectPopup from "./VideoPopup"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

const GRID_SIZE = 12
const CELL_SIZE = 60 // pixels per grid cell

interface Frame {
  id: number
  image: string
  content: string
  demoLink?: string
  githubLink?: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  isHovered: boolean
}

const calculateGridPosition = (index: number, gridSize: number = 4) => {
  const row = Math.floor(index / 3); // 3 items per row
  const col = index % 3;
  return {
    x: col * gridSize,
    y: row * gridSize,
    w: gridSize,
    h: gridSize
  };
};

export default function DynamicFrameLayout() {
  const { data, loading, error } = usePortfolioData()
  const [frames, setFrames] = useState<Frame[]>([])
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Frame | null>(null)

  if (loading) {
    return <div>Loading projects...</div>
  }

  if (error) {
    return <div>Error loading projects: {error}</div>
  }

  if (!data) {
    return <div>No projects available</div>
  }

  const framesData = data.projects.map((project) => ({
    ...project,
    defaultPos: calculateGridPosition(project.id - 1),
    corner: `https://static.cdn-luma.com/files/bcf576df9c38b05f/${project.id}_corner_update.png`,
    edgeHorizontal: `https://static.cdn-luma.com/files/bcf576df9c38b05f/${project.id}_vert_update.png`,
    edgeVertical: `https://static.cdn-luma.com/files/bcf576df9c38b05f/${project.id}_hori_update.png`,
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  }))

  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateFrameProperty = (id: number, property: keyof Frame, value: number) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, [property]: value } : frame)))
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) {
      setShowControls(false)
    }
  }

  const updateCodebase = () => {
    console.log("Updating codebase with current values:")
    console.log("Hover Size:", hoverSize)
    console.log("Gap Size:", gapSize)
    console.log("Frames:", frames)
    // Here you would typically make an API call to update the codebase
    // For now, we'll just log the values
  }

  const handleProjectClick = (frame: Frame) => {
    setSelectedProject(frame)
  }

  const closePopup = () => {
    setSelectedProject(null)
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl">My Works <span className="text-sm text-slate-500 font-bold">( Click to see in detail )</span></h1>
      <div className="flex justify-between items-center mb-4"></div>
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Dynamic Frame Layout</h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Hide Controls" : "Show Controls"}</Button>
            <Button onClick={updateCodebase}>Update Codebase</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Show UI" : "Hide UI"}</Button>
          </div>
        </div>
      )}
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gap-size" className="block text-sm font-medium text-gray-200">
              Gap Size: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {framesData.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <FrameComponent
                image={frame.image}
                content={frame.content}
                demoLink={frame.demoLink}
                githubLink={frame.githubLink}
                width="100%"
                height="100%"
                className="absolute inset-0 cursor-pointer"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={(value) => updateFrameProperty(frame.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateFrameProperty(frame.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateFrameProperty(frame.id, "borderSize", value)}
                showControls={false}
                label={`Frame ${frame.id}`}
                showFrame={false}
                isHovered={
                  hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
                onClick={() => handleProjectClick(frame)}
              />
            </motion.div>
          )
        })}
      </div>
      {selectedProject && (
        <ProjectPopup
          image={selectedProject.image}
          content={selectedProject.content}
          demoLink={selectedProject.demoLink}
          githubLink={selectedProject.githubLink}
          onClose={closePopup}
        />
      )}
    </div>
  )
}

