# Category Criteria Manager

## Overview

This project provides a web-based interface for managing category-specific criteria, such as mandatory and optional lab analyses, blocked countries for import, and labeling requirements. The application is built using React and leverages GitHub for data storage and version control.

## Features

*   **Category Management**: Add, edit, and delete product categories.
*   **Criteria Management**: Define and manage various criteria for each category:
    *   **Lab Analyses**: Specify mandatory and optional lab tests.
    *   **Blocked Countries**: List countries from which import is restricted, along with reasons.
    *   **Label Requirements**: Detail specific labeling instructions.
*   **GitHub Integration**: Data is stored in a `categories.json` file within the GitHub repository, enabling version control and collaborative updates via pull requests.
*   **User-Friendly Interface**: An intuitive single-page application for easy data entry and viewing.

## System Architecture

The application follows a static web application architecture, hosted on GitHub Pages. It comprises:

*   **Frontend**: A React application (HTML, CSS, JavaScript) providing the user interface.
*   **Data Store**: A `categories.json` file acting as the database, stored directly in the GitHub repository.
*   **GitHub API**: Used for reading and writing data to the `categories.json` file, ensuring all changes are version-controlled.

## Setup and Installation

To set up the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd category-criteria-manager
    ```
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Start the development server**:
    ```bash
    pnpm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1.  **View Categories**: On the left sidebar, you will see a list of existing categories. Click on a category to view its details.
2.  **Add a New Category**: Click the `+` button in the Categories sidebar. Enter the category name and description in the dialog that appears.
3.  **Edit Category Details**: Select a category, then click the `Edit` button in the main content area to modify its name or description.
4.  **Manage Criteria**: Within a selected category, navigate through the `Lab Analyses`, `Blocked Countries`, and `Label Requirements` tabs. Click the `+` button within each section (when in edit mode) to add new criteria.
5.  **Delete Categories/Criteria**: Click the trash icon next to a category in the sidebar to delete it. Similarly, click the `X` icon next to a specific criterion to remove it.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure they adhere to the project's coding standards.
4.  Commit your changes with a clear and descriptive message.
5.  Push your branch to your forked repository.
6.  Open a pull request to the main repository.

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, please open an issue on the GitHub repository.
