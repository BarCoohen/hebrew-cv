# Copilot Instructions for Hebrew CV Builder

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Hebrew CV (Resume) builder application built with Next.js 14+, TypeScript, and Tailwind CSS.

## Key Project Requirements:
- Full Hebrew language support with RTL (right-to-left) layout
- Uses 'Rubik' font from Google Fonts as the primary font
- PDF generation using PDFShift API service
- In-memory global object as temporary database
- App Router structure with TypeScript

## Important Guidelines:
- All UI text and content should be in Hebrew
- All components must support RTL layout
- Use `lang="he"` and `dir="rtl"` in HTML elements
- The ClassicTemplate.tsx component serves as the single source of truth for PDF styling
- Use renderToStaticMarkup from react-dom/server for PDF generation
- Maintain consistent Hebrew typography and proper RTL formatting

## Project Structure:
- Landing page at `/` 
- CV editor at `/editor`
- API routes for saving, retrieving, and generating PDFs
- Template system for CV layouts
