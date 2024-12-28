import { Badge } from "@/components/ui/badge"
import React from 'react'

function Footer() {
  return (
    <footer className="flex justify-center gap-4 mb-16">
      <Badge variant="secondary" className="text-sm text-gray-800">
        Dashboard v2.1
      </Badge>
      <Badge
        variant="outline"
        className="bg-neutral-800 text-sm border-neutral-700 text-gray-500"
      >
        v2
      </Badge>
    </footer>
  );
}

export default Footer
