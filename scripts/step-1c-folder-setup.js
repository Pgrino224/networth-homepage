// Step 1c: Create Folder Structure - Setup Script
// Establishes the complete folder hierarchy for the NetWorth project
// Based on the master plan specifications for 9-section website
// This script creates all necessary folders and placeholder files

// IMPORTANT: This script creates the folder structure that will be used
// throughout the entire project. The structure follows the Webimp standards
// with sections/ instead of components/sections/ and includes all supporting
// folders for assets, utilities, and documentation

const fs = require('fs');
const path = require('path');

// Define the project root (run from project root directory)
const projectRoot = process.cwd();

// Folder structure based on Master Plan specifications
const folderStructure = {
  // Source code directories
  'src/sections': 'All 9 section components (Hero, Welcome, etc.)',
  'src/components': 'Only reusable components (buttons, cards, etc.)',
  'src/lib': 'Utility functions and helpers',
  'src/hooks': 'Custom React hooks',
  'src/data': 'Static data and constants',
  
  // Public asset directories
  'public/images': 'Image assets (logos, backgrounds, etc.)',
  'public/videos': 'Video files for backgrounds or content',
  'public/fonts': 'Custom font files',
  'public/icons': 'Icon assets and favicons',
  
  // Documentation and reference directories
  'references/semantic-html': 'Zentry HTML reference files',
  'references/screenshots': 'Visual references from Zentry',
  'references/notes': 'Development notes and decisions',
  
  // Development support directories
  'logs': 'Implementation logs and progress tracking',
  'scripts': 'Build scripts and utilities',
  'tests': 'Test files (if needed)',
  
  // Additional organization folders
  'docs': 'Project documentation',
  'config': 'Configuration files'
};

// Placeholder files to create in certain directories
const placeholderFiles = {
  'src/sections/.gitkeep': '# Section components will be added in Step 3',
  'src/components/.gitkeep': '# Reusable components only',
  'src/lib/.gitkeep': '# Utility functions',
  'src/hooks/.gitkeep': '# Custom React hooks',
  'src/data/constants.js': `// Global constants for NetWorth project
export const SITE_NAME = 'NetWorth';
export const SITE_DESCRIPTION = 'Where Financial Education Meets Immersive Gameplay';
`,
  'logs/IMPLEMENTATION_LOG.md': `# NetWorth Implementation Log

## Project Started: ${new Date().toISOString().split('T')[0]}

### ✅ Step 1a Complete: Project Initialized
- Created Next.js project with Pages Router
- Installed all dependencies
- Date: ${new Date().toISOString().split('T')[0]}

### ✅ Step 1b Complete: Cleaned Default Next.js
- Removed boilerplate code
- Created minimal index.js
- Date: ${new Date().toISOString().split('T')[0]}

### ✅ Step 1c Complete: Folder Structure Created
- All directories established
- Ready for development
- Date: ${new Date().toISOString().split('T')[0]}
`,
  'scripts/validate-step.js': `// Validation script placeholder
console.log('Step validation script - to be implemented');
`,
  'scripts/check-structure.js': `// Structure checking script placeholder
console.log('Structure check script - to be implemented');
`,
  'references/semantic-html/README.md': '# Zentry Reference Files\n\nPlace the 11 Zentry HTML files here for reference during development.',
  'docs/README.md': '# NetWorth Documentation\n\nProject documentation and guides.'
};

// Function to create directories
function createDirectories() {
  console.log('🏗️  Creating NetWorth folder structure...\n');
  
  Object.entries(folderStructure).forEach(([folderPath, description]) => {
    const fullPath = path.join(projectRoot, folderPath);
    
    try {
      // Create directory recursively
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Created: ${folderPath}`);
      console.log(`   └─ ${description}\n`);
    } catch (error) {
      console.error(`❌ Error creating ${folderPath}:`, error.message);
    }
  });
}

// Function to create placeholder files
function createPlaceholderFiles() {
  console.log('\n📄 Creating placeholder files...\n');
  
  Object.entries(placeholderFiles).forEach(([filePath, content]) => {
    const fullPath = path.join(projectRoot, filePath);
    
    try {
      // Only create if file doesn't exist
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Created: ${filePath}`);
      } else {
        console.log(`⏭️  Skipped: ${filePath} (already exists)`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${filePath}:`, error.message);
    }
  });
}

// Function to rename components folder to sections
function handleComponentsFolder() {
  const componentsPath = path.join(projectRoot, 'src/components');
  const sectionsPath = path.join(projectRoot, 'src/sections');
  
  // If old components folder exists and sections doesn't, rename it
  if (fs.existsSync(componentsPath) && !fs.existsSync(sectionsPath)) {
    console.log('\n🔄 Renaming components folder to sections...');
    fs.renameSync(componentsPath, sectionsPath);
    console.log('✅ Renamed: src/components → src/sections\n');
  }
}

// Main execution function
function setupFolderStructure() {
  console.log('🚀 NetWorth Folder Structure Setup\n');
  console.log('Running from:', projectRoot);
  console.log('================================\n');
  
  // Check if we're in the right directory
  if (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
    console.error('❌ Error: package.json not found!');
    console.error('Make sure you run this script from the project root directory.');
    process.exit(1);
  }
  
  // Execute setup steps
  handleComponentsFolder();
  createDirectories();
  createPlaceholderFiles();
  
  console.log('\n================================');
  console.log('✨ Folder structure setup complete!');
  console.log('📁 Total directories created:', Object.keys(folderStructure).length);
  console.log('📄 Total files created:', Object.keys(placeholderFiles).length);
  console.log('\nNext step: Begin creating section components (Step 3)');
}

// Run the setup
setupFolderStructure();

// Instructions for manual execution:
console.log('\n📝 Note: You can also create this structure manually using:');
console.log('mkdir -p src/{sections,components,lib,hooks,data}');
console.log('mkdir -p public/{images,videos,fonts,icons}');
console.log('mkdir -p references/{semantic-html,screenshots,notes}');
console.log('mkdir -p {logs,scripts,tests,docs,config}');