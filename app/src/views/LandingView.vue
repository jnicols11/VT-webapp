<template>
  <div class="landing-page bg-gray-100 text-gray-800">
    <!-- Hero Section -->
    <div class="relative bg-white">
      <div class="container mx-auto px-6 lg:px-20 py-20 flex flex-col lg:flex-row items-center">
        <div class="lg:w-1/2 text-center lg:text-left">
          <h1 class="text-5xl font-bold leading-tight text-gray-900 mb-6">
            Elevate Your Style with <span class="text-blue-500">Vibed Threads</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Discover the latest trends in fashion with our exclusive collection. Whether you're
            dressing up or keeping it casual, we have something for everyone.
          </p>
          <div class="flex justify-center lg:justify-start gap-4">
            <button
              @click="shopNow"
              class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Shop Now
            </button>
            <button
              @click="learnMore"
              class="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
            >
              Learn More
            </button>
          </div>
        </div>
        <div class="lg:w-1/2 mt-10 lg:mt-0">
          <img src="../assets/fashion.jpg" alt="Fashion" class="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>

    <!-- Categories Section -->
    <div class="bg-gray-100 py-16">
      <div class="container mx-auto px-6 lg:px-20">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            @click="navigateCategory('mens')"
            class="category-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl"
          >
            <img src="../assets/mens.jpg" alt="Mens" class="w-full h-64 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800">Men's Collection</h3>
              <p class="text-gray-600 mt-2">Stylish outfits for every occasion.</p>
            </div>
          </div>
          <div
            @click="navigateCategory('womens')"
            class="category-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl"
          >
            <img src="../assets/womens.jpg" alt="Womens" class="w-full h-64 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800">Women's Collection</h3>
              <p class="text-gray-600 mt-2">Chic and trendy styles for every season.</p>
            </div>
          </div>
          <div
            @click="navigateCategory('kids')"
            class="category-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl"
          >
            <img src="../assets/kids.jpg" alt="Kids" class="w-full h-64 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800">Kids' Collection</h3>
              <p class="text-gray-600 mt-2">Comfortable and fun outfits for little ones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="bg-blue-500 text-white py-16">
      <div class="container mx-auto px-6 lg:px-20">
        <h2 class="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="testimonial-card bg-blue-600 p-6 rounded-lg shadow-lg">
            <p class="text-lg italic">
              "Absolutely love Vibed Threads! The quality and designs are unmatched."
            </p>
            <div class="mt-4">
              <h4 class="font-bold">- Sarah J.</h4>
              <p>Verified Customer</p>
            </div>
          </div>
          <div class="testimonial-card bg-blue-600 p-6 rounded-lg shadow-lg">
            <p class="text-lg italic">
              "My go-to for stylish and comfortable clothes. Highly recommend!"
            </p>
            <div class="mt-4">
              <h4 class="font-bold">- John D.</h4>
              <p>Verified Customer</p>
            </div>
          </div>
          <div class="testimonial-card bg-blue-600 p-6 rounded-lg shadow-lg">
            <p class="text-lg italic">
              "Great selection and fast delivery. Couldn't ask for more!"
            </p>
            <div class="mt-4">
              <h4 class="font-bold">- Emily R.</h4>
              <p>Verified Customer</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="bg-gray-900 text-white py-16">
      <div class="container mx-auto px-6 lg:px-20 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Elevate Your Style?</h2>
        <p class="text-lg mb-8">
          Join thousands of happy customers and transform your wardrobe today.
        </p>
        <button
          @click="shopNow"
          class="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        >
          Start Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const shopNow = () => {
      router.push('/shop')
    }

    const learnMore = () => {
      router.push('/about')
    }

    const navigateCategory = (category) => {
      router.push(`/category/${category}`)
    }

    return {
      shopNow,
      learnMore,
      navigateCategory
    }
  }
}
</script>

<style scoped>
.category-card:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
