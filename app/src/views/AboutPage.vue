<template>
  <div class="bg-gray-100 text-gray-800">
    <!-- Hero Section -->
    <div
      class="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-8"
    >
      <div class="container mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">Welcome to VibedThreads</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Discover the story behind our journey, our passion for fashion, and the values that drive
          us to bring you a world-class shopping experience.
        </p>
      </div>
      <img
        src="../assets/fashion.jpg"
        alt="Fashion Background"
        class="absolute inset-0 w-full h-full object-cover opacity-20"
      />
    </div>

    <!-- About Content -->
    <div class="container mx-auto py-16 px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Image -->
        <div class="ml-48">
          <img
            src="../assets/clothes.jpg"
            alt="Our Vision"
            class="rounded-lg shadow-lg w-3/4 1/2"
          />
        </div>
        <!-- Content -->
        <div>
          <h2 class="text-4xl font-bold mb-6">Our Vision</h2>
          <p class="text-lg mb-4">
            VibedThreads is more than just a store. It's a place where fashion meets passion. Our
            vision is to redefine how people experience online shopping by offering a curated
            selection of styles that inspire confidence and individuality.
          </p>
          <p class="text-lg">
            From the latest trends to timeless classics, we bring you high-quality apparel that fits
            your unique style. We’re committed to creating an inclusive and inspiring space where
            everyone feels at home.
          </p>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-indigo-50 py-16 px-8">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-12">Our Core Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Quality</h3>
            <p class="text-gray-600">
              We prioritize quality in every piece we deliver, ensuring our customers always feel
              confident and comfortable.
            </p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Sustainability</h3>
            <p class="text-gray-600">
              Our commitment to sustainability means we source responsibly and aim to minimize our
              environmental footprint.
            </p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Innovation</h3>
            <p class="text-gray-600">
              By embracing innovation, we’re constantly improving our platform to provide the best
              shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="container mx-auto py-16 px-8 text-center">
      <h2 class="text-4xl font-bold text-center mb-12">Meet the Team</h2>
      <div>
        <div class="text-center">
          <img
            src="../assets/me.png"
            alt="Team Member"
            class="rounded-full w-40 h-40 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold">Jordan Nicols-Pyle</h3>
          <p class="text-gray-600">Lead Developer</p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-indigo-600 text-white py-12 px-8 text-center">
      <h2 class="text-4xl font-bold mb-4">Join Our Journey</h2>
      <p class="text-xl mb-6">
        Explore the latest collections and redefine your style with VibedThreads. Let’s create
        something extraordinary together.
      </p>
      <button
        class="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-100 transition"
      >
        Start Shopping
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutPage'
}
</script>
