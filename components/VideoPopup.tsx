import type React from "react"

interface ProjectPopupProps {
  image: string
  content: string
  demoLink?: string
  githubLink?: string
  onClose: () => void
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ image, content, demoLink, githubLink, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-4xl bg-black/80 rounded-xl p-6">
        <img src={image} alt="Project Preview" className="w-full aspect-video object-cover rounded-lg shadow-lg mb-4" />
        
        <div className="text-white/80 mb-6">
          {content}
        </div>

        <div className="flex gap-4 justify-center">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 transition-colors"
            >
              View Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 transition-colors"
            >
              GitHub
            </a>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProjectPopup

