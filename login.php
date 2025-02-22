<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get form data
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Validate data (basic validation)
  if (!empty($email) && !empty($password)) {
    // Save data to a text file
    $file = 'login_data.txt';
    $data = "Email: $email, Password: $password\n";

    // Open the file in append mode
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
      echo "<p>Data saved successfully!</p>";
    } else {
      echo "<p>Failed to save data.</p>";
    }
  } else {
    echo "<p>Please fill in all fields.</p>";
  }
}
?>
