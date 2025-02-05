// Simple Script Visibility Fix Utility
export const verifyAndFixScripts = () => {
  // Find and fix any hidden scripts
  const fixHiddenScripts = () => {
    const scripts = document.getElementsByTagName('script');
    
    Array.from(scripts).forEach(script => {
      const styles = window.getComputedStyle(script);
      
      // Check if script is hidden
      if (styles.display === 'none') {
        // Make script visible
        script.style.cssText = 'display: block !important;';
        
        // If script contains anchors.add, re-execute it
        if (script.text?.includes('anchors.add')) {
          try {
            new Function(script.text)();
          } catch (error) {
            console.error('Error executing script:', error);
          }
        }
      }
    });
  };

  // Run the fix
  fixHiddenScripts();
};