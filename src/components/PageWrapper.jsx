import { motion } from "framer-motion";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}   // البداية: شبه شفاف ومن اليمين
      animate={{ opacity: 1, x: 0 }}    // عند الدخول: يظهر بالكامل
      exit={{ opacity: 0, x: 0 }}     // عند الخروج: يختفي إلى اليسار
      transition={{ duration: 0.2 }}    // مدة الانتقال بالنصف ثانية
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
