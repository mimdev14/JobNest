import BackgroundEffects from "./BackgroundEffects";
import SearchBar from "./SearchBar";
import StatsSection from "./StatsSection";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-20">
        {/* Badge */}
        <div className="mx-auto mb-6 w-fit rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 backdrop-blur">
          <span className="text-sm font-medium text-blue-300">
             The Future of Hiring Starts Here
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-center text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
          Find Your{" "}
          <span className="text-blue-400">Dream Job</span>
          <br />
          With Confidence
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-300 md:text-xl">
          Discover thousands of verified job opportunities from trusted
          companies. Whether you're searching for your next career move or
          hiring top talent, JobNest brings everything together in one place.
        </p>

        {/* Search */}
        <SearchBar />

        {/* Stats */}
        <StatsSection />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}