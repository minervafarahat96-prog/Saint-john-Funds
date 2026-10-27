# صناديق يوحنا — نظام متابعة العشور والمصروفات

كل صندوق له: صفحة خاصة + شيت جوجل خاص + خدمة (Apps Script) خاصة + كلمة سر منفصلة.
البيانات في Google Sheet تابع لحسابك، وكلمة السر تُفحص على الخادم (مش داخل الصفحة).

## الإعداد (يتكرر لكل صندوق من الخمسة)
1. أنشئي Google Sheet جديد باسم الصندوق.
2. من القائمة: Extensions ← Apps Script، امسحي الموجود والصقي محتوى `Code.gs`.
3. Project Settings ← Script properties ← Add: الاسم `PASSWORD` والقيمة كلمة سر الصندوق.
4. Deploy ← New deployment ← Web app: Execute as = Me، Who has access = Anyone ← Deploy، وافقي على الصلاحيات، وانسخي رابط الـ Web app.
5. افتحي `<اسم-الصندوق>/config.js` وضعي الرابط مكان `PASTE_WEB_APP_URL_HERE`.

## النشر على GitHub
1. أنشئي Repository جديد وارفعي محتويات هذا المجلد.
2. Settings ← Pages ← Branch: main ← Save.
3. العناوين: `https://USERNAME.github.io/REPO/schools/` وكذلك brides / projects / sick / general.

## دومين منفصل لكل صندوق (اختياري)
كل مجلد صندوق مستقل بذاته. لدومين خاص: ضعي المجلد وحده في Repository مستقل، وأضيفي ملف `CNAME` فيه اسم الدومين، وفعّلي Pages، ووجّهي الدومين من إعدادات الـ DNS.

## ملاحظات
- كل من يعرف كلمة سر الصندوق يقدر يسجّل ويحذف فيه. استخدمي كلمات سر قوية وغيّريها من Script properties.
- لتعديل بنود المصروف: عدّلي `cats` في config.js.
