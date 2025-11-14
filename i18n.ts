import i18n from 'https://aistudiocdn.com/i18next@^23.11.5';
import { initReactI18next } from 'https://aistudiocdn.com/react-i18next@^14.1.2';

const resources = {
  en: {
    translation: {
      "app_title": "Training System",
      "welcome_admin": "Welcome, Admin",
      // Sidebar
      "sidebar_dashboard": "Dashboard",
      "sidebar_trainers": "Trainers Mgt.",
      "sidebar_clients": "Clients Mgt.",
      "sidebar_packages": "Packages Mgt.",
      "sidebar_reports": "Financial Reports",
      "sidebar_settings": "Settings",
      // Dashboard
      "dashboard_title": "Main Dashboard",
      "customize_colors": "Customize Colors",
      "stat_total_trainers": "Total Trainers",
      "stat_total_clients": "Total Clients",
      "stat_total_packages": "Total Packages",
      "stat_monthly_revenue": "Monthly Revenue",
      "chart_title": "Subscriptions & Revenue Overview",
      "chart_subscriptions": "Subscriptions",
      "chart_revenue": "Revenue",
      "upcoming_bookings": "Upcoming Bookings",
      "with_trainer": "With Trainer",
      "currency_format": "{{val, number}} SAR",
      // Months
      "month_jan": "Jan", "month_feb": "Feb", "month_mar": "Mar", "month_apr": "Apr", "month_may": "May", "month_jun": "Jun",
      // Status
      "status_confirmed": "Confirmed",
      "status_pending": "Pending",
      "status_cancelled": "Cancelled",
       // Color Modal
      "modal_customize_colors_title": "Customize Stat Card Colors",
      "color_form_helper_text": "Enter Tailwind CSS color classes (e.g.,",
      "color_form_trainers": "Trainers Card",
      "color_form_clients": "Clients Card",
      "color_form_packages": "Packages Card",
      "color_form_revenue": "Revenue Card",
      // General
      "actions": "Actions",
      "edit": "Edit",
      "delete": "Delete",
      "save_changes": "Save Changes",
      "cancel": "Cancel",
      "close": "Close",
      "retry": "Retry",
      "loading_data": "Loading data...",
      "error_loading_data": "Failed to load data. Please refresh the page.",
      // Trainers Mgt
      "trainers_management_title": "Trainers Management",
      "add_new_trainer": "Add New Trainer",
      "trainer_name": "Trainer Name",
      "city": "City",
      "specialization": "Specialization",
      "join_date": "Join Date",
      "modal_add_trainer_title": "Add New Trainer",
      "modal_edit_trainer_title": "Edit Trainer Information",
      "add_trainer": "Add Trainer",
      "confirm_delete_title": "Confirm Deletion",
      "confirm_delete": "Confirm Delete",
      "confirm_delete_trainer_message": "Are you sure you want to delete the trainer {{name}}? This action cannot be undone.",
      // Clients Mgt
      "clients_management_title": "Clients Management",
      "search_client_placeholder": "Search for a client...",
      "client_name": "Client Name",
      "current_package": "Current Package",
      "sessions_left": "Sessions Left",
      "unsubscribed": "Not Subscribed",
      "show_qr": "Show QR",
      "no_clients_found": "No clients match this search.",
      "modal_edit_client_title": "Edit Client Data",
      "select_package": "Select a package",
      // Packages Mgt
      "packages_management_title": "Packages & Pricing Management",
      "add_new_package": "Add New Package",
      "package_name": "Package Name",
      "training_type": "Training Type",
      "number_of_sessions": "Number of Sessions",
      "price_sar": "Price (SAR)",
      "modal_add_package_title": "Add New Package",
      "modal_edit_package_title": "Edit Package Information",
      "add_package": "Add Package",
      "confirm_delete_package_message": "Are you sure you want to delete the package {{name}}?",
      "عادي": "Normal",
      "EMS": "EMS",
      "Platten": "Platten",
       // Notifications
      "notifications_title": "Notifications",
      "notification_body": "has {{count}} session left in the {{packageName}} package.",
      "notification_body_plural": "has {{count}} sessions left in the {{packageName}} package.",
      "send_whatsapp_reminder": "Send WhatsApp Reminder",
      "no_new_notifications": "No new notifications.",
      "unknown_package": "Unknown Package",
      // Toasts
      "toast_add_trainer_success": "Trainer added successfully",
      "toast_update_trainer_success": "Trainer updated successfully",
      "toast_delete_trainer_success": "Trainer deleted successfully",
      "toast_update_client_success": "Client updated successfully",
      "toast_add_package_success": "Package added successfully",
      "toast_update_package_success": "Package updated successfully",
      "toast_delete_package_success": "Package deleted successfully",
      "toast_reminder_sent_to": "Reminder sent to",
      "toast_colors_updated": "Card colors updated successfully",
      // Settings
      "settings_title": "Settings",
      "appearance": "Appearance",
      "theme": "Theme",
      "light": "Light",
      "dark": "Dark",
      "choose_theme": "Choose a theme for the dashboard.",
      // Error Boundary
      "error_boundary_title": "Something went wrong.",
      "error_boundary_message": "An unexpected error occurred. Please try refreshing the page.",
      "error_boundary_button": "Refresh Page"
    }
  },
  ar: {
    translation: {
      "app_title": "نظام التدريب",
      "welcome_admin": "مرحباً, مدير النظام",
      // Sidebar
      "sidebar_dashboard": "لوحة التحكم",
      "sidebar_trainers": "إدارة المدربين",
      "sidebar_clients": "إدارة العملاء",
      "sidebar_packages": "إدارة الباقات",
      "sidebar_reports": "التقارير المالية",
      "sidebar_settings": "الإعدادات",
      // Dashboard
      "dashboard_title": "لوحة التحكم الرئيسية",
      "customize_colors": "تخصيص الألوان",
      "stat_total_trainers": "إجمالي المدربين",
      "stat_total_clients": "إجمالي العملاء",
      "stat_total_packages": "إجمالي الباقات",
      "stat_monthly_revenue": "الأرباح الشهرية",
      "chart_title": "نظرة عامة على الاشتراكات والأرباح",
      "chart_subscriptions": "اشتراكات",
      "chart_revenue": "أرباح",
      "upcoming_bookings": "الحجوزات القادمة",
      "with_trainer": "مع المدرب",
      "currency_format": "{{val, number}} ريال",
      // Months
      "month_jan": "يناير", "month_feb": "فبراير", "month_mar": "مارس", "month_apr": "أبريل", "month_may": "مايو", "month_jun": "يونيو",
      // Status
      "status_confirmed": "مؤكد",
      "status_pending": "قيد الانتظار",
      "status_cancelled": "ملغي",
       // Color Modal
      "modal_customize_colors_title": "تخصيص ألوان البطاقات",
      "color_form_helper_text": "أدخل أصناف Tailwind CSS (مثال:",
      "color_form_trainers": "بطاقة المدربين",
      "color_form_clients": "بطاقة العملاء",
      "color_form_packages": "بطاقة الباقات",
      "color_form_revenue": "بطاقة الأرباح",
      // General
      "actions": "إجراءات",
      "edit": "تعديل",
      "delete": "حذف",
      "save_changes": "حفظ التغييرات",
      "cancel": "إلغاء",
      "close": "إغلاق",
      "retry": "إعادة المحاولة",
      "loading_data": "جاري تحميل البيانات...",
      "error_loading_data": "فشل تحميل البيانات. يرجى تحديث الصفحة.",
      // Trainers Mgt
      "trainers_management_title": "إدارة المدربين",
      "add_new_trainer": "إضافة مدرب جديد",
      "trainer_name": "اسم المدرب",
      "city": "المدينة",
      "specialization": "التخصص",
      "join_date": "تاريخ الانضمام",
      "modal_add_trainer_title": "إضافة مدرب جديد",
      "modal_edit_trainer_title": "تعديل بيانات المدرب",
      "add_trainer": "إضافة مدرب",
      "confirm_delete_title": "تأكيد الحذف",
      "confirm_delete": "تأكيد الحذف",
      "confirm_delete_trainer_message": "هل أنت متأكد من حذف المدرب {{name}}؟ لا يمكن التراجع عن هذا الإجراء.",
      // Clients Mgt
      "clients_management_title": "إدارة العملاء",
      "search_client_placeholder": "ابحث عن عميل...",
      "client_name": "اسم العميل",
      "current_package": "الباقة الحالية",
      "sessions_left": "الحصص المتبقية",
      "unsubscribed": "غير مشترك",
      "show_qr": "عرض QR",
      "no_clients_found": "لا يوجد عملاء يطابقون هذا البحث.",
      "modal_edit_client_title": "تعديل بيانات العميل",
      "select_package": "اختر باقة",
      // Packages Mgt
      "packages_management_title": "إدارة الباقات والأسعار",
      "add_new_package": "إضافة باقة جديدة",
      "package_name": "اسم الباقة",
      "training_type": "نوع التدريب",
      "number_of_sessions": "عدد الحصص",
      "price_sar": "السعر (ريال)",
      "modal_add_package_title": "إضافة باقة جديدة",
      "modal_edit_package_title": "تعديل بيانات الباقة",
      "add_package": "إضافة باقة",
      "confirm_delete_package_message": "هل أنت متأكد من حذف باقة {{name}}؟",
      "عادي": "عادي",
      "EMS": "EMS",
      "Platten": "Platten",
      // Notifications
      "notifications_title": "الإشعارات",
      "notification_body": "لديه {{count}} حصة متبقية في باقة {{packageName}}.",
      "notification_body_zero": "لم يتبق لديه أي حصص في باقة {{packageName}}.",
      "notification_body_one": "لديه حصة واحدة متبقية في باقة {{packageName}}.",
      "notification_body_two": "لديه حصتان متبقيتان في باقة {{packageName}}.",
      "notification_body_few": "لديه {{count}} حصص متبقية في باقة {{packageName}}.",
      "notification_body_other": "لديه {{count}} حصة متبقية في باقة {{packageName}}.",
      "send_whatsapp_reminder": "إرسال تذكير واتساب",
      "no_new_notifications": "لا توجد إشعارات جديدة.",
      "unknown_package": "باقة غير معروفة",
      // Toasts
      "toast_add_trainer_success": "تمت إضافة المدرب بنجاح",
      "toast_update_trainer_success": "تم تحديث بيانات المدرب بنجاح",
      "toast_delete_trainer_success": "تم حذف المدرب بنجاح",
      "toast_update_client_success": "تم تحديث بيانات العميل بنجاح",
      "toast_add_package_success": "تمت إضافة الباقة بنجاح",
      "toast_update_package_success": "تم تحديث بيانات الباقة بنجاح",
      "toast_delete_package_success": "تم حذف الباقة بنجاح",
      "toast_reminder_sent_to": "تم إرسال تذكير إلى",
      "toast_colors_updated": "تم تحديث ألوان البطاقات بنجاح",
       // Settings
      "settings_title": "الإعدادات",
      "appearance": "المظهر",
      "theme": "السمة",
      "light": "فاتح",
      "dark": "داكن",
      "choose_theme": "اختر سمة لواجهة التحكم.",
      // Error Boundary
      "error_boundary_title": "حدث خطأ ما.",
      "error_boundary_message": "حدث خطأ غير متوقع. يرجى محاولة تحديث الصفحة.",
      "error_boundary_button": "تحديث الصفحة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === 'number') {
          return new Intl.NumberFormat(lng).format(value);
        }
        return value;
      }
    },
    // The 'debug' option, if needed, can be set to true for development
    // debug: true,
  });

export default i18n;