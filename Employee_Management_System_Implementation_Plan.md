# Veloce Systems Employee Management System Implementation Plan

Employee and Department Manager modules, as shown in the supplied EMS screens.

| | |
|---|---|
| **Prepared by** | Gonzalez, Polo C. |
| **Version** | 1.0 |
| **Basis** | Features and UI behavior come from the supplied EMS document (37 screens). Sample names, dates, counts and records in the mockups are interface examples, not fixed production data. |

## Contents

1. [Scope and boundaries](#1-scope-and-boundaries)
2. [Roles and functional coverage](#2-roles-and-functional-coverage)
3. [Delivery phases](#3-delivery-phases)
4. [Employee module](#4-employee-module)
5. [Department Manager module](#5-department-manager-module)
6. [Cross-module data and access](#6-cross-module-data-and-access)
7. [Validation and error handling](#7-validation-and-error-handling)
8. [UI screen reference](#8-ui-screen-reference)
9. [Completion checklist](#9-completion-checklist)

---

## 1. Scope and boundaries

The EMS gives employees one place for account access, daily work, attendance, tasks, company announcements, leave requests and profile management. A Department Manager area adds employee monitoring, task administration, leave review and announcement management.

The build should keep the visual hierarchy and interaction patterns of the supplied screens.

> **Boundary:** Only behavior shown in the supplied EMS work is included. No unrelated modules are added, and no framework, database or authentication provider is assumed, because none is specified in the source material.

### Objectives

- Secure account activation and employee login.
- Employee access to attendance information and daily work status.
- Assigned tasks with related details.
- Company announcements.
- Leave request creation with status tracking.
- Department tools for attendance review, task administration, leave processing and announcements.

### Shared interface

- One Veloce Systems visual identity across employee and manager screens: dark interface treatment with light form controls.
- Employee sidebar: Dashboard, Announcements, Tasks, Attendance, Leave Requests, and profile/settings. Manager navigation covers dashboard, employees, attendance, tasks, leave requests and announcements.
- Search, filters, tables, cards, pagination, forms, confirmations and success states appear wherever the screens show them.

## 2. Roles and functional coverage

### Employee features (as specified)

- Activate account using Employee ID and company email.
- Log in. The default password is sent to the employee's email.
- Change the default password and username on first login.
- View and update personal profile.
- View attendance records.
- View assigned tasks and update task status.
- View announcements.
- Create leave requests and view their status.
- Change password.

### Department Manager features (Information Technology department)

- Review the department dashboard.
- View department employees and open their attendance.
- Create, assign, edit and monitor tasks.
- Review leave requests and approve or reject them.
- Create, edit and manage department announcements.

### Coverage matrix

| Area | Employee | Department Manager |
|---|---|---|
| Authentication and setup | Activate, log in, change first-login credentials | Access represented by the manager interface |
| Dashboard | Personal tasks, attendance, leave requests, announcements | Department overview, tasks, leave requests, announcements |
| Profile | View and update profile, change password | Not separately detailed in the supplied screens |
| Attendance | View own records | View department employee records |
| Tasks | View assigned tasks and details | Create, assign, edit, monitor |
| Announcements | Read, bookmark, filter, open | Post, edit, view, manage |
| Leave | Create and monitor own requests | Review, approve or reject |

## 3. Delivery phases

Phases run in dependency order: access first, then the employee workspace, then the manager workspace that acts on it.

### Phase 0. Project and screen baseline

- Inventory the employee and manager screens.
- Confirm navigation, shared components, forms, tables, cards, filters and confirmation states.
- Use the screenshots as the reference for spacing, hierarchy, controls and states.

### Phase 1. Authentication and account setup

- Build Employee Login and Activate Account.
- Support the validation states shown: invalid username, missing fields, invalid employee details, mismatched activation information.
- Build first-login credential replacement with its password rules.

### Phase 2. Employee workspace

- Build Dashboard, Profile, Attendance, Tasks, Announcements and Leave Requests.
- Keep each dashboard card tied to its module.
- Build the search, filter, pagination, date selection, bookmark and detail interactions shown.

### Phase 3. Department Manager workspace

- Build Dashboard, employee listing, attendance records, Tasks, Leave Requests and Announcements.
- Build task creation, assignment and editing, and the leave approval and rejection flows.
- Build announcement posting and editing with the fields shown.

### Phase 4. Cross-module consistency

- Keep employee-facing tasks, leave, attendance and announcements consistent with manager actions.
- Return users to the intended module from confirmation and success screens.
- Check that filters, summaries, tables and pagination use the same records as their source screens.

### Phase 5. UI validation and handoff

- Compare every page with the supplied screenshots.
- Test normal flows and the visible error and confirmation states.
- Document any behavior the screens do not define before calling the build final.

## 4. Employee module

The module is one connected workflow: activation leads to login, first-login credential setup leads to the dashboard, and the dashboard opens profile, tasks, attendance, announcements and leave requests.

### 4.1 Authentication and account setup

| Screen | Behavior | Implementation requirements |
|---|---|---|
| Login | Username and password fields, Login action, Forgot Password control, Activate Account link. | Validate username and password before dashboard access. Validation state: highlight invalid fields, show the message, keep the user on the screen until corrected. Empty or invalid credentials never succeed. |
| Activate Account | Employee ID/Number and company email, then Activate. On success a default password is sent to the registered company email, and the user returns to Login. | Validate ID, email, required fields, and that the ID and email match. Error state: field-level messages for invalid details, unregistered email, blank fields and mismatch. Keep the form open for correction. |
| Update User Credentials | First-login screen with new username, default password, new password and confirmation, then Save. | Wrong default password: highlight the field, show the message, block saving. Live password-strength feedback; block saving when confirmation does not match. New password must meet the requirements shown on the screen. |

### 4.2 Workspace screens

| Screen | Behavior | Implementation requirements |
|---|---|---|
| Dashboard | Cards for My Tasks, Attendance, My Leave Requests and Announcements. | Show task information; check in and check out from the attendance area. Review announcements and submit a leave request. Sidebar opens the detailed modules. |
| Profile | Profile information, contact details, profile picture, password-change controls. | Review and update editable personal details. Change the account password and save profile changes. |
| Tasks list | Assigned work with priority, due date, assigned-by and status. | Search; filter by All Tasks, In Progress, Completed or Not Started. Paginate; open a task for details. Employees can update task status. |
| Task details | Everything needed to understand and report progress on a task. | Show requirements and any supporting or reference information. Accept submission notes where shown; navigate back to the list. |
| Attendance | Monthly record with summary values and a table. | Show Total Days of Shift, Number Present and Number of Absence. Month/calendar selector and paginated records. |
| Announcements | Company updates, policies and notices. | Tabs: All Announcements, Bookmarked, Unread; pagination. Bookmark icon saves an item to the Bookmarked tab. Read More opens the full announcement, with a way back to the list. |
| Leave requests | Request form plus a history table with status. | Fields: leave type (dropdown), start date, end date, reason. Calendar date picker; total leave days calculated automatically. History with status and pagination. |

## 5. Department Manager module

This module extends the EMS from self-service to department administration. The working scope shown is the Information Technology department.

| Screen | Behavior | Implementation requirements |
|---|---|---|
| Dashboard | Department overview. | Total employees and employees present today. Ongoing tasks; total, pending, approved and rejected leave requests. Recent tasks with assignees; recent announcements. |
| Employees | Department employee listing. | Columns: Employee ID, name, position, status, actions. Search, filter, pagination, action menu, View Attendance. |
| Attendance record | One employee's attendance. | Summary of Present, Late, Absent and On Leave. Columns: Date, Employee, Time In, Time Out, Status, Remarks. Return goes back to the employee view. |
| Tasks list | Department task monitoring. | Totals for Pending, In Progress and Completed. Search and status filter; columns: task ID, title, assignee, due date, priority, status, action. Create Task button; pagination. |
| Create Task and Assign | Two steps: enter the task, then pick assignees. | Title, description, priority, due date, optional attachments; Cancel or Assign. Assignment screen: search employees, see position and status, select one or more, Back or Create Task. |
| Edit Task and confirmation | Same fields as creation. | Update title, description, priority, due date and attachments; Cancel or Save Changes. Success state offers View Task and Back to Tasks. |
| Leave requests list | Department-wide view of applications. | Counts: Total, Pending, Approved, Rejected. Search; filter by leave type and status. Columns: request ID, employee, leave type, date filed, leave dates, status, action; pagination. |
| Leave request details | Basis for the decision. | Employee name, ID, position, email. Leave type, date filed, dates, duration, reason, supporting documents, remarks. Approve and Reject controls. |
| Approve / Reject | Confirmation dialogs, then success screens. | Both dialogs show leave type, dates and duration. Approve: Cancel or Confirm. Reject: a reason is required; Cancel or Reject. Success states confirm the outcome and offer a return action. |
| Announcements list | Post and manage announcements. | Totals for Total, Active and Scheduled; search; filter by status and type. Columns: title, type, date posted, status, action (View Details, Edit, Delete). |
| Post / Edit Announcement | Form with publishing options. | Title, content, type (System, Meeting, Advisory, Update, Reminder), optional attachments. Post Now or Schedule for Later; Cancel or Post Announcement. Edit updates title, type, content and attachments; Cancel or Save Changes. Posted confirmation shows the announcement is available to department employees. |

## 6. Cross-module data and access

Employee self-service and manager actions share records. Keep the relationships below without adding technical database assumptions.

### Consistency requirements

- A task created and assigned by the department appears in the assigned employee's task view.
- A leave request submitted by an employee appears in the department Leave Requests workflow.
- A manager's approval or rejection shows in the employee's leave-request status.
- Posted announcements reach the intended employee audience.
- Attendance matches between the employee's own view and the manager's review.
- Success screens return the user to the module the design shows.

### Access considerations

- Employees see only their own account and records.
- Managers see only the department their interface represents.
- Task assignment and leave actions apply only to the employee or request selected in the manager workflow.
- Direct navigation and controls must not expose unrelated employee or department data.

## 7. Validation and error handling

The validation and confirmation states in the screens are part of the build, not optional visuals.

### Authentication

- Reject invalid or unknown usernames; require both login fields.
- Reject invalid Employee ID/Number and unregistered or invalid company email at activation.
- Employee ID and company email must correspond.
- The default password must match before credentials can change.
- New and confirmation passwords must match and meet the visible security requirements.

### Workflows

- Check required task fields before creating or updating a task.
- Require complete leave requests; support date selection and automatic total days.
- Require a reason to reject a leave request.
- Show a success state after each successful task, leave or announcement action.

### UI states to preserve

- Field-level errors, password-strength feedback and password-mismatch feedback.
- Success confirmation screens.
- Empty and no-result states where applicable.
- Filtered-list, pagination and calendar/date-picker states.

## 8. UI screen reference

Screen numbers refer to the 37 screenshots in the original document.

| Role | Screens | Coverage |
|---|---|---|
| Employee | 1–4 | Login, login validation, activation, activation validation |
| Employee | 5–7 | Credential update and password validation |
| Employee | 8 | Dashboard |
| Employee | 9 | Profile |
| Employee | 10–11 | Tasks and task details |
| Employee | 12–13 | Attendance |
| Employee | 14–16 | Announcements |
| Employee | 17–19 | Leave Requests |
| Manager | 20 | Department Dashboard |
| Manager | 21–22 | Employees and attendance |
| Manager | 23–27 | Tasks: list, create, assignment, edit, success |
| Manager | 28–33 | Leave requests and approval/rejection workflow |
| Manager | 34–37 | Announcements and posting workflow |

### Visual principles

- Keep the Veloce Systems branding, dark interface treatment and light form controls.
- Keep the sidebar structure and the active-page emphasis.
- Use cards for summary information where the designs do.
- Keep table headers, status labels, filters, search controls and pagination where the designs put them.
- Make confirmation dialogs and success screens look different from data-entry states.
- Settle spacing and hierarchy questions by checking the screenshots.

## 9. Completion checklist

The implementation is complete when each item holds against the supplied EMS work.

- [ ] Account activation accepts the Employee ID/Number and company email flow.
- [ ] Employee login and its visible validation states work.
- [ ] First-login credential replacement and password validation work.
- [ ] Employee Dashboard has the task, attendance, leave and announcement areas.
- [ ] Employee Profile supports the information and controls shown.
- [ ] Employee Tasks supports search, filtering, status views, details and pagination.
- [ ] Employee Attendance supports the summary, records, month/date selection and pagination.
- [ ] Employee Announcements supports the tabs, bookmarking, Read More and pagination.
- [ ] Employee Leave Requests supports creation, date selection, total-day calculation, history, status and pagination.
- [ ] Manager Dashboard reflects the department overview.
- [ ] Department employee listing and attendance review work.
- [ ] Manager task creation, assignment, editing and success flow work.
- [ ] Manager leave review, approval, rejection and confirmation states work.
- [ ] Manager announcement listing, posting, editing and posted confirmation work.
- [ ] Employee-facing information and manager actions stay consistent across shared workflows.
- [ ] The interface has been checked against all supplied screenshots for layout and interaction.
- [ ] No unsupported module or behavior has been added without a project decision.
