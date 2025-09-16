// This file contains mock data that allows bypassing authentication in development
// It simulates the authenticated state for testing and development

// Set up browser storage with authentication data for testing
export function setupDevAuth() {
  if (typeof window === 'undefined') return;
  
  // For student user
  const studentUser = {
    id: "student1",
    name: "Student User",
    email: "student@university.edu",
    role: "student"
  };
  
  // For admin user
  const adminUser = {
    id: "admin1",
    name: "Admin User",
    email: "admin@university.edu",
    role: "admin"
  };
  
  // Store default user (can be switched later)
  localStorage.setItem('user', JSON.stringify(studentUser));
  console.log('Dev auth setup complete');
}
