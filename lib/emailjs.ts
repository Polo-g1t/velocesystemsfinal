import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_28b9j0b';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_f3yxa2s';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'biTFi7kK76AxrUbHL';

export interface EmailParams {
  to_name: string;
  to_email: string;
  employee_id: string;
  username: string;
  default_password: string;
  department?: string;
  position?: string;
  role?: string;
}

export async function sendEmailJSCredentials(params: EmailParams): Promise<{ success: boolean; message: string }> {
  try {
    // Provide comprehensive alias mappings for whichever variables the user configured in their EmailJS template
    const templateParams = {
      // Common recipient fields
      to_name: params.to_name,
      name: params.to_name,
      user_name: params.to_name,
      to_email: params.to_email,
      email: params.to_email,
      user_email: params.to_email,

      // Credential fields
      employee_id: params.employee_id,
      employee_number: params.employee_id,
      emp_id: params.employee_id,
      username: params.username,
      login_username: params.username,
      default_password: params.default_password,
      temp_password: params.default_password,
      password: params.default_password,

      // Role & Org fields
      department: params.department || 'Information Technology',
      position: params.position || 'Software Engineer',
      role: params.role || 'employee',

      // General message body
      message: `Welcome to Veloce Systems EMS!\n\nYour account has been activated:\nEmployee ID: ${params.employee_id}\nUsername: ${params.username}\nDefault Password: ${params.default_password}\nDepartment: ${params.department || 'Information Technology'}\n\nPlease log in and update your credentials upon first login.`,
    };

    console.log('[EmailJS] Sending activation credentials to:', params.to_email, templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('[EmailJS] Dispatch success:', response.status, response.text);
    return {
      success: true,
      message: `Credentials successfully sent to ${params.to_email} via EmailJS (Status: ${response.status}).`
    };
  } catch (error: any) {
    console.error('[EmailJS] Dispatch failed:', error);
    return {
      success: false,
      message: error?.text || error?.message || 'Failed to dispatch email via EmailJS.'
    };
  }
}
