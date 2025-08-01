import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Privacy Policy for Hero App Workout
      </h1>
      <p className="mb-4">Last updated: October 23, 2024</p>

      <div className="prose">
        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          About Hero App Workout
        </h2>
        <p>
          Hero App Workout is your personalized fitness assistant for achieving
          workout goals. Our app is designed to help you create, track, and
          optimize your fitness journey.
        </p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Key Features:</h3>
        <ul className="list-inside list-disc">
          <li>
            Personalized workout plans tailored to your fitness level and goals
          </li>
          <li>Progress tracking with detailed metrics and visualizations</li>
          <li>Extensive exercise library with tutorials and form guides</li>
          <li>Goal setting and achievement rewards system</li>
          <li>
            Integration with wearable devices for comprehensive health
            monitoring
          </li>
        </ul>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Data Usage and Collection
        </h2>
        <p>
          At Hero App Workout, we are committed to transparency in our data
          practices. We collect and use personal data to provide you with a
          tailored and effective fitness experience. Here's how we use your
          data:
        </p>

        <ul className="list-inside list-disc">
          <li>
            <strong>Personal Information:</strong> We collect data such as your
            name, email, age, and gender to create and manage your account.
          </li>
          <li>
            <strong>Fitness Data:</strong> Your workout history, exercise
            preferences, and physical measurements are used to create
            personalized workout plans and track your progress.
          </li>
          <li>
            <strong>Device Information:</strong> We collect data about your
            device and how you interact with our app to improve our service and
            troubleshoot issues.
          </li>
          <li>
            <strong>Location Data:</strong> With your permission, we may use
            your location to provide relevant fitness recommendations and
            features.
          </li>
        </ul>

        <p>
          This data is used solely to enhance your experience with Hero App
          Workout and is never sold to third parties.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Detailed Privacy Policy
        </h2>
        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use, and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>

        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Interpretation and Definitions
        </h2>
        <h3 className="mb-2 mt-4 text-xl font-semibold">Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Definitions</h3>
        <ul className="list-inside list-disc">
          <li>
            <strong>Account</strong> means a unique account created for You to
            access our Service or parts of our Service.
          </li>
          <li>
            <strong>Application</strong> refers to Hero App Workout, the
            software program provided by the Company.
          </li>
          <li>
            <strong>Company</strong> (referred to as either "the Company", "We",
            "Us" or "Our" in this Agreement) refers to Hero App Workout.
          </li>
          <li>
            <strong>Country</strong> refers to: France.
          </li>
          <li>
            <strong>Device</strong> means any device that can access the
            Service, such as a computer, a cellphone, or a digital tablet.
          </li>
          <li>
            <strong>Personal Data</strong> is any information that relates to an
            identified or identifiable individual.
          </li>
          <li>
            <strong>Service</strong> refers to the Application.
          </li>
          <li>
            <strong>Usage Data</strong> refers to data collected automatically,
            either generated by the use of the Service or from the Service
            infrastructure itself (for example, the duration of a page visit).
          </li>
          <li>
            <strong>You</strong> means the individual accessing or using the
            Service, or the company, or other legal entity on behalf of which
            such individual is accessing or using the Service, as applicable.
          </li>
        </ul>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Collecting and Using Your Personal Data
        </h2>
        <h3 className="mb-2 mt-4 text-xl font-semibold">
          Types of Data Collected
        </h3>
        <p>
          <strong>Personal Data</strong>
          <br />
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
        </p>
        <ul className="list-inside list-disc">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Usage Data</li>
        </ul>

        <p>
          <strong>Usage Data</strong>
          <br />
          Usage Data is collected automatically when using the Service. It may
          include information such as Your Device's Internet Protocol address
          (e.g., IP address), browser type, browser version, pages of our
          Service that You visit, time and date of Your visit, time spent on
          those pages, unique device identifiers, and other diagnostic data.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Use of Your Personal Data
        </h2>
        <p>The Company may use Personal Data for the following purposes:</p>
        <ul className="list-inside list-disc">
          <li>
            To provide and maintain our Service, including to monitor the usage
            of our Service.
          </li>
          <li>To manage Your Account.</li>
          <li>To contact You for service-related notifications.</li>
          <li>To provide news, special offers, and general information.</li>
          <li>To manage Your requests to Us.</li>
        </ul>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Retention of Your Personal Data
        </h2>
        <p>
          We retain Personal Data only as long as necessary for purposes
          specified in this Privacy Policy, complying with legal obligations,
          resolving disputes, and enforcing policies.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Transfer of Your Personal Data
        </h2>
        <p>
          Your information may be transferred to computers located outside Your
          jurisdiction. We ensure adequate controls are in place, including the
          security of Your data.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Delete Your Personal Data
        </h2>
        <p>
          You have the right to delete Your Personal Data. You may request
          assistance via Your Account or contact Us.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Disclosure of Your Personal Data
        </h2>
        <p>
          We may disclose Your Personal Data to fulfill legal obligations,
          protect our rights, and perform business transactions, among other
          legitimate interests.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Security of Your Personal Data
        </h2>
        <p>
          We strive to protect Your Personal Data, but no online transmission or
          electronic storage is completely secure.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">Children's Privacy</h2>
        <p>
          Our Service does not target individuals under 13. We take steps to
          delete Personal Data provided by children without verified parental
          consent.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Links to Other Websites
        </h2>
        <p>
          Our Service may link to third-party sites. We have no control over
          their privacy practices.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">
          Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically and notify You through
          email or on the Service.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data
          practices, you can contact us at:
        </p>
        <p>Email: pro.julien.thomas@gmail.com</p>
        <p>Address: 123 Fitness Street, 75001 Paris, France</p>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
