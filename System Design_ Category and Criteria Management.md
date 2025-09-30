> # System Design: Category and Criteria Management

## 1. Introduction

This document outlines the architecture and design for a web-based form system hosted on GitHub. The system allows users to manage and view category-specific criteria, including mandatory and optional lab analyses, blocked countries for import, and labeling requirements. The primary goal is to create a user-friendly interface for data entry and a structured, version-controlled system for data storage, now enhanced with a dedicated administrative interface.

## 2. System Architecture

The proposed architecture is a static web application hosted on GitHub Pages. This approach is cost-effective and leverages GitHub's built-in features for version control and collaboration. The system consists of four main components:

*   **Frontend**: A single-page web application built with HTML, CSS, and JavaScript (React). This provides the user interface for viewing, adding, and editing categories and their associated criteria.
*   **Data Store**: A JSON file (`categories.json`) stored within the GitHub repository serves as the database. This file contains a structured representation of all categories and their criteria.
*   **GitHub Integration**: The system uses the GitHub API to read and write to the `categories.json` file. This allows for all data changes to be version-controlled and managed through pull requests.
*   **Administrative Interface**: A dedicated section within the frontend, accessible via a password, that provides full CRUD (Create, Read, Update, Delete) operations for categories and their criteria, along with data export and import functionalities.

## 3. Database Schema

The `categories.json` file is an array of category objects. Each object has the following structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | A unique identifier for the category (e.g., "CAT-001"). |
| `name` | String | The name of the category (e.g., "Food Products"). |
| `description` | String | A brief explanation of the category. |
| `criteria` | Object | Contains all criteria specific to this category. |

The `criteria` object has the following nested structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `lab_analyses` | Object | Contains arrays for mandatory and optional lab analyses. |
| `blocked_countries` | Array | An array of objects, each representing a blocked country. |
| `label_requirements` | Array | An array of objects, each representing a label requirement. |

### 3.1. Lab Analyses

The `lab_analyses` object contains two arrays: `mandatory` and `optional`. Each element in these arrays is an object with the following structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | The name of the lab analysis. |
| `details` | String | A description of the analysis. |

### 3.2. Blocked Countries

Each object in the `blocked_countries` array has the following structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `country_code` | String | The ISO 3166-1 alpha-2 country code. |
| `reason` | String | The reason for blocking the country. |

### 3.3. Label Requirements

Each object in the `label_requirements` array has the following structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `requirement` | String | The specific labeling requirement. |
| `details` | String | Additional details about the requirement. |

## 4. GitHub Integration

The system is tightly integrated with GitHub to provide version control and collaboration features. The repository is structured as follows:

*   **Repository Structure**: A dedicated GitHub repository houses the frontend code (in a `/docs` folder for GitHub Pages) and the `categories.json` data file at the root.
*   **Version Control**: All changes to `categories.json` are committed to the repository, providing a complete history of modifications. This allows for easy auditing and the ability to revert to previous versions of the data.
*   **Collaboration**: Multiple users can contribute to the data by forking the repository, making changes, and submitting pull requests. This allows for a review and approval process before changes are merged into the main data file.

## 5. Administrative Interface

The administrative interface provides a secure way to manage all categories and their criteria directly through the web application. Key features include:

*   **Admin Login**: A password-protected entry point to access administrative functionalities.
*   **Category CRUD**: Ability to Create, Read, Update, and Delete categories.
*   **Criteria Management**: Full control over adding, editing, and removing mandatory/optional lab analyses, blocked countries, and label requirements for each category.
*   **Data Export/Import**: Functionality to export the `categories.json` data for backup and import data to restore or update the system.

## 6. Next Steps

The project is now complete with the implementation of the administrative interface. The next steps involve final review and delivery of the system and its documentation.
