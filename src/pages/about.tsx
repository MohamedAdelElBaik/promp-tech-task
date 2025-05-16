import { Layout } from "@/components/layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

          {/* Banner Image */}
          <div className="rounded-lg overflow-hidden mb-10">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Our team collaborating"
              className="w-full h-[300px] object-cover"
            />
          </div>

          <div className="space-y-6 prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p>
              Founded in 2023, ModernUI began with a simple mission: to make
              beautiful, functional, and accessible user interfaces available to
              developers of all skill levels. We believe that great design
              should be accessible to everyone, and that's why we've created a
              suite of components and tools that make it easy to build stunning
              applications.
            </p>

            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p>
              Our mission is to empower developers to create exceptional user
              experiences without reinventing the wheel. We do this by providing
              high-quality, customizable UI components that adhere to best
              practices in design, accessibility, and performance.
            </p>

            <h2 className="text-2xl font-semibold">Our Team</h2>
            <p>
              Our diverse team consists of experienced designers, developers,
              and UX specialists who are passionate about creating beautiful and
              functional interfaces. We're united by our commitment to
              excellence and our belief that well-designed applications can make
              a positive impact on users' lives.
            </p>

            <h2 className="text-2xl font-semibold">Our Values</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Quality:</strong> We never compromise on the quality of
                our components.
              </li>
              <li>
                <strong>Accessibility:</strong> We believe digital experiences
                should be accessible to everyone.
              </li>
              <li>
                <strong>Simplicity:</strong> We strive for intuitive solutions
                that are easy to implement and use.
              </li>
              <li>
                <strong>Innovation:</strong> We continuously explore new
                technologies and design patterns.
              </li>
              <li>
                <strong>Community:</strong> We value the contributions and
                feedback from our user community.
              </li>
            </ul>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
