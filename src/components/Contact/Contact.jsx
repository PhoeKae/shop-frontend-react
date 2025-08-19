import React from 'react'
import Heading from '../Heading/Heading';

const Contact = () => {
  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 py-20">

        {/* Heading */}
        <div className=" mb-12">
          <Heading highlight="Contact" heading="Us" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-zinc-800 mb-4">Contact Information</h3>
            <p className="text-gray-600 mb-3">
              📍 MyoThit Quatar, Pyawbwe , Mandalay
            </p>
            <p className="text-gray-600 mb-3">
              ☎️ +95 9 751149893
            </p>
            <p className="text-gray-600 mb-3">
              📧 seingyi@gmail.com
            </p>
            <p className="text-gray-600">
              ⏰ Mon - Sun : 8:00 AM - 9:00 PM
            </p>
          </div>

          {/* Location */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Coffee Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1559.445921300258!2d96.0440153985905!3d20.5884383307265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smm!4v1755595965554!5m2!1sen!2smm"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px]"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact